import type { Request, Response, NextFunction } from 'express';
import type { AuthRequest } from '../../common/types/request';
import { streamText, convertToModelMessages, embed, stepCountIs } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { UserModel } from '../../user/models/User';
import crypto from 'node:crypto';
import { conversationRepository } from '../repository/index';
import { mediaRepository } from '../../media/repository/index';
import { mapFileToResponse } from '../../media/types/index';
import { sendResponse } from '../../common/helpers';
import { HTTP_STATUS_CODES } from '../../common/constants/http-status-codes';
import type { ChatInput, UpdateConversationInput } from './req-schema';
import type { Message } from '../types/index';
import storageService from '../../../lib/storage';
import { allTools } from '../tools';
import { userSettingsCache } from '../../user/helpers/user-settings-cache';
import { safeDecryptGeminiKey } from '../../user/helpers/safe-decrypt';
import envConfig from '@/lib/env';
import { isValidObjectId } from 'mongoose';
import { conversationNotFoundError } from '../constants/errors';


const listConversations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authReq = req as AuthRequest;
        const conversations = await conversationRepository.listConversations({ user_id: authReq.user_id! });
        return sendResponse({ res, status: HTTP_STATUS_CODES.OK })(conversations);
    } catch (error) {
        return next(error);
    }
};

const getConversation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authReq = req as AuthRequest;
        if (!isValidObjectId(req.params.id)) {
            return next(conversationNotFoundError())
        }
        const conversation = await conversationRepository.getConversationById({ user_id: authReq.user_id!, id: req.params.id as string });
        return sendResponse({ res, status: HTTP_STATUS_CODES.OK })(conversation);
    } catch (error) {
        return next(error);
    }
};

const createConversation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authReq = req as AuthRequest;
        const conversation = await conversationRepository.createConversation({ user_id: authReq.user_id! });
        return sendResponse({ res, status: HTTP_STATUS_CODES.CREATED })(conversation);
    } catch (error) {
        return next(error);
    }
};

const deleteConversation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authReq = req as AuthRequest;
        await conversationRepository.deleteConversation({ user_id: authReq.user_id!, id: req.params.id as string });
        return sendResponse({ res, status: HTTP_STATUS_CODES.OK })({ message: 'Conversation removed' });
    } catch (error) {
        return next(error);
    }
};

const updateConversation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authReq = req as AuthRequest;
        const id = req.params.id as string;
        const updateData = req.body as UpdateConversationInput;
        const conversation = await conversationRepository.updateConversation({ user_id: authReq.user_id!, id, updateData });
        return sendResponse({ res, status: HTTP_STATUS_CODES.OK })(conversation);
    } catch (error) {
        return next(error);
    }
};

const chat = async (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthRequest;
    const { messages, conversationId } = req.body as ChatInput;

    try {
        const user = await userSettingsCache.getSettings(authReq.user_id!);
        const useUserKey = user?.settings?.should_use_own_gemini_key && user?.gemini_api_key;

        const apiKey = useUserKey
            ? safeDecryptGeminiKey(user.gemini_api_key!)
            : envConfig.get('GOOGLE_GENERATIVE_AI_API_KEY');

        const googleProvider = createGoogleGenerativeAI({
            apiKey: apiKey!,
        });

        const conversation = await conversationRepository.findOrCreateConversation({ user_id: authReq.user_id!, conversationId });

        const newUserMessages = messages
            .filter(
                (m: { role: string; id: string }) =>
                    m.role === 'user' &&
                    !conversation.messages.some((existing) => existing.id === m.id)
            )
            .map((m: ChatInput['messages'][number]): Message => ({
                id: m.id,
                role: m.role,
                parts: m.parts,
                created_at: new Date(),
            }));

        if (newUserMessages.length > 0) {
            await conversationRepository.appendMessages(conversation, newUserMessages);
            await conversationRepository.autoTitle(conversation);
        }

        const collectedMedia: { msgIdx: number, buffer: Buffer, mimeType: string, type: 'image' | 'file' }[] = [];

        const sanitizedMessages = await Promise.all(messages.map(async (m, msgIdx) => ({
            ...m,
            parts: (await Promise.all(m.parts.filter((p) =>
                p.type === 'text' ||
                p.type === 'reasoning' ||
                p.type.startsWith('tool-') ||
                p.type === 'file'
            ).map(async (p) => {
                if (p.type === 'file' && (p as any).file?.id) {
                    const fileRecord = await mediaRepository.getFileById((p as any).file.id);
                    // Handle images and audio for direct model processing
                    if (fileRecord && (fileRecord.type.startsWith('image/') || fileRecord.type.startsWith('audio/'))) {
                        try {
                            const buffer = await storageService.get(fileRecord.path);
                            collectedMedia.push({
                                msgIdx,
                                buffer,
                                mimeType: fileRecord.type,
                                type: fileRecord.type.startsWith('image/') ? 'image' : 'file'
                            });
                        } catch (err) {
                            console.error('Failed to read media file from storage:', err);
                        }
                        return null;
                    }
                    return null; // Don't send other files directly in parts for now e.g texts. That is processed using RAG during uploads
                }
                return p;
            }))).filter(Boolean),
        })));

        const modelMessages = await convertToModelMessages(sanitizedMessages as any);

        // Inject collected media as raw Uint8Array parts into the corresponding model messages
        for (const media of collectedMedia) {
            const modelMsg = modelMessages[media.msgIdx];
            if (modelMsg && modelMsg.role === 'user') {
                const mediaPart = media.type === 'image'
                    ? { type: 'image' as const, image: new Uint8Array(media.buffer), mimeType: media.mimeType }
                    : { type: 'file' as const, data: new Uint8Array(media.buffer), mediaType: media.mimeType };

                if (typeof modelMsg.content === 'string') {
                    modelMsg.content = [
                        { type: 'text' as const, text: modelMsg.content },
                        mediaPart,
                    ];
                } else if (Array.isArray(modelMsg.content)) {
                    modelMsg.content.push(mediaPart);
                }
            }
        }

        const files = conversationId ? await mediaRepository.getFilesByConversationId(conversationId) : [];
        const fileListStr = files.map(f => `${f.name} (id: ${f._id})`).join(', ');

        const lastUserMessage = messages.filter((m) => m.role === 'user').pop();
        const lastUserText = lastUserMessage?.parts.find((p) => p.type === 'text')?.text;
        let context = '';
        if (lastUserText && conversationId && files.length > 0) {
            const { embedding } = await embed({
                model: googleProvider.textEmbeddingModel('gemini-embedding-001'),
                value: lastUserText,
            });

            const relevantChunks = await mediaRepository.findRelevantChunks(conversationId, embedding);
            if (relevantChunks.length > 0) {
                context = relevantChunks.map(c => c.text).join('\n\n');
            }
        }

        const systemPrompt = [
            "You are a versatile and intelligent AI assistant. You provide helpful, concise, and conversational responses to a wide range of questions, while also leveraging specialized tools like IGDB for gaming data or localized processing for files and images.",
            `The current conversation ID is ${conversation._id}. You MUST provide this ID to tools that require it (like applyImageEffect).`,
            "IMPORTANT: Use the provided tools (like getSystemInfo) ONLY if the user explicitly asks for system metrics, uptime, or process information.",
            "Gaming Images: IGDB images use hashes. The pattern is https://images.igdb.com/igdb/image/upload/t_{size}/{hash}.jpg. Common sizes: t_cover_big, t_screenshot_huge, t_720p, t_1080p. Append _2x for high-DPI (e.g. t_720p_2x).",
            "CRITICAL: To display IGDB images in the chat, you MUST use Markdown image syntax: ![description](https://url). Always ensure you prepend 'https:' to IGDB image URLs if they start with '//'.",
            "Gaming Tools: If the user asks about a game, search for it first, then get more details if needed. Prefer showing release dates, ratings, and platforms.",
            "Image Processing: You can process BOTH uploaded files and external images (like IGDB covers).",
            "- For uploaded files: Use the fileId from the list below.",
            "- For IGDB/External images: Use the imageUrl from the game details.",
            "File Generation: You can generate .txt or .pdf files based on user requests (e.g., 'summarize this into a pdf', 'create a text file of our discussion').",
            "- You MUST always provide the current conversationId to tools like applyImageEffect and generateFile.",
            fileListStr ? `The user has uploaded the following files: ${fileListStr}.` : "",
            context ? `Use the following relevant context from these files to inform your response:\n${context}` : (fileListStr ? "The user is asking about the documents, but no specific relevant content was found via vector search. Acknowledge the files exist and ask for more specific questions if needed." : "")
        ].filter(Boolean).join('\n\n');

        const result = streamText({
            model: googleProvider('gemini-3.1-flash-lite-preview'),
            messages: modelMessages,
            system: systemPrompt,
            tools: allTools,
            stopWhen: stepCountIs(5),
            onFinish: async (event) => {
                const consolidatedParts: any[] = [];
                const toolResultsMap = new Map<string, any>();

                // First, collect all tool results from all steps
                for (const step of event.steps) {
                    for (const part of step.content) {
                        if (part.type === 'tool-result') {
                            toolResultsMap.set(part.toolCallId, part.output);
                        }
                    }
                }

                // Then, build consolidated parts from all steps
                for (const step of event.steps) {
                    for (const part of step.content) {
                        if (part.type === 'text') {
                            consolidatedParts.push({
                                type: 'text',
                                text: part.text
                            });
                        } else if (part.type === 'tool-call') {
                            const result = toolResultsMap.get(part.toolCallId);
                            consolidatedParts.push({
                                type: `tool-${part.toolName}`,
                                toolCallId: part.toolCallId,
                                state: 'output-available',
                                input: part.input,
                                output: result,
                            });
                        }
                    }
                }

                if (consolidatedParts.length > 0) {
                    await conversationRepository.appendMessages(conversation, [{
                        id: crypto.randomUUID(),
                        role: 'assistant',
                        parts: consolidatedParts,
                        created_at: new Date(),
                    }]);
                }
            },
        });

        const response = result.toUIMessageStreamResponse({
            messageMetadata: () => ({ conversationId: conversation._id.toString() })
        });

        res.writeHead(response.status, Object.fromEntries(response.headers.entries()));

        const reader = response.body?.getReader();
        if (reader) {
            const pump = async () => {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    res.write(value);
                }
                res.end();
            };
            pump().catch((err) => {
                console.error('Stream error:', err);
                res.end();
            });
        } else {
            res.end();
        }
    } catch (error) {
        return next(error);
    }
};

const searchConversations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authReq = req as AuthRequest;
        const query = req.query.q as string;
        const conversations = await conversationRepository.searchConversations({ user_id: authReq.user_id!, query });
        return sendResponse({ res, status: HTTP_STATUS_CODES.OK })(conversations);
    } catch (error) {
        return next(error);
    }
};

const getConversationFiles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authReq = req as AuthRequest;
        const id = req.params.id as string;

        await conversationRepository.getConversationById({ user_id: authReq.user_id!, id });

        const files = await mediaRepository.getFilesByConversationId(id);
        return sendResponse({ res, status: HTTP_STATUS_CODES.OK })(files.map(mapFileToResponse));
    } catch (error) {
        return next(error);
    }
};

const shareConversation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authReq = req as AuthRequest;
        const id = req.params.id as string;
        const { visibility } = req.body;
        const conversation = await conversationRepository.toggleSharing({ user_id: authReq.user_id!, id, visibility });
        return sendResponse({ res, status: HTTP_STATUS_CODES.OK })(conversation);
    } catch (error) {
        return next(error);
    }
};

const getSharedConversation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.params.token as string;
        const conversation = await conversationRepository.getSharedConversation({ token });
        return sendResponse({ res, status: HTTP_STATUS_CODES.OK })(conversation);
    } catch (error) {
        return next(error);
    }
};

const forkConversation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authReq = req as AuthRequest;
        const token = req.params.token as string;
        const conversation = await conversationRepository.forkConversation({ user_id: authReq.user_id!, share_token: token });
        return sendResponse({ res, status: HTTP_STATUS_CODES.CREATED })(conversation);
    } catch (error) {
        return next(error);
    }
};

export const conversationActions = {
    listConversations,
    getConversation,
    createConversation,
    updateConversation,
    deleteConversation,
    searchConversations,
    getConversationFiles,
    chat,
    shareConversation,
    getSharedConversation,
    forkConversation,
};
