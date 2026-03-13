import type { Request, Response, NextFunction } from 'express';
import { streamText, convertToModelMessages, embed, tool, stepCountIs } from 'ai';
import { google } from '@ai-sdk/google';
import crypto from 'node:crypto';
import { conversationRepository } from '../repository/index';
import { mediaRepository } from '../../media/repository/index';
import { mapFileToResponse } from '../../media/types/index';
import { sendResponse } from '../../common/helpers';
import { HTTP_STATUS_CODES } from '../../common/constants/http-status-codes';
import type { ChatInput, UpdateConversationInput } from './req-schema';
import type { Message } from '../types/index';
import { z } from 'zod';
import process from 'node:process';
import fs from 'node:fs/promises';
import sharp from 'sharp';
import { igdbApi } from '../../igdb/index';


const listConversations = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const conversations = await conversationRepository.listConversations();
        return sendResponse({ res, status: HTTP_STATUS_CODES.OK })(conversations);
    } catch (error) {
        return next(error);
    }
};

const getConversation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const conversation = await conversationRepository.getConversationById(req.params.id as string);
        return sendResponse({ res, status: HTTP_STATUS_CODES.OK })(conversation);
    } catch (error) {
        return next(error);
    }
};

const createConversation = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const conversation = await conversationRepository.createConversation();
        return sendResponse({ res, status: HTTP_STATUS_CODES.CREATED })(conversation);
    } catch (error) {
        return next(error);
    }
};

const deleteConversation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await conversationRepository.deleteConversation(req.params.id as string);
        return sendResponse({ res, status: HTTP_STATUS_CODES.OK })({ message: 'Conversation removed' });
    } catch (error) {
        return next(error);
    }
};

const updateConversation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        const updateData = req.body as UpdateConversationInput;
        const conversation = await conversationRepository.updateConversation(id, updateData);
        return sendResponse({ res, status: HTTP_STATUS_CODES.OK })(conversation);
    } catch (error) {
        return next(error);
    }
};

const chat = async (req: Request, res: Response, next: NextFunction) => {
    const { messages, conversationId } = req.body as ChatInput;

    try {
        const conversation = await conversationRepository.findOrCreateConversation(conversationId);

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

        const collectedImages: { msgIdx: number, buffer: Buffer, mimeType: string }[] = [];

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
                    // For images, collect the buffer and drop the part. We will inject it post-conversion
                    if (fileRecord && fileRecord.type.startsWith('image/')) {
                        try {
                            const buffer = await fs.readFile(fileRecord.path);
                            collectedImages.push({ msgIdx, buffer, mimeType: fileRecord.type });
                        } catch (err) {
                            console.error('Failed to read image file:', err);
                        }
                        return null;
                    }
                    return null; // Don't send other files directly in parts for now e.g texts. That is processed using RAG during uploads
                }
                return p;
            }))).filter(Boolean),
        })));

        const modelMessages = await convertToModelMessages(sanitizedMessages as any);

        // Inject collected images as raw Uint8Array parts into the corresponding model messages
        for (const img of collectedImages) {
            const modelMsg = modelMessages[img.msgIdx];
            if (modelMsg && modelMsg.role === 'user') {
                const imagePart = { type: 'image' as const, image: new Uint8Array(img.buffer), mimeType: img.mimeType };
                if (typeof modelMsg.content === 'string') {
                    modelMsg.content = [
                        { type: 'text' as const, text: modelMsg.content },
                        imagePart,
                    ];
                } else if (Array.isArray(modelMsg.content)) {
                    modelMsg.content.push(imagePart);
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
                model: google.textEmbeddingModel('gemini-embedding-001'),
                value: lastUserText,
            });

            const relevantChunks = await mediaRepository.findRelevantChunks(conversationId, embedding);
            if (relevantChunks.length > 0) {
                context = relevantChunks.map(c => c.text).join('\n\n');
            }
        }

        const systemPrompt = [
            "You are an advanced software engineer participating in a group chat about design and development, and you also have access to the IGDB database to answer questions about video games. Be concise and conversational.",
            "IMPORTANT: Use the provided tools (like getSystemInfo) ONLY if the user explicitly asks for system metrics, uptime, or process information.",
            "Gaming Images: IGDB images use hashes. The pattern is https://images.igdb.com/igdb/image/upload/t_{size}/{hash}.jpg. Common sizes: t_cover_big, t_screenshot_huge, t_720p, t_1080p. Append _2x for high-DPI (e.g. t_720p_2x).",
            "CRITICAL: To display IGDB images in the chat, you MUST use Markdown image syntax: ![description](https://url). Always ensure you prepend 'https:' to IGDB image URLs if they start with '//'.",
            "Gaming Tools: If the user asks about a game, search for it first, then get more details if needed. Prefer showing release dates, ratings, and platforms. Note: You CANNOT apply image effects to game covers or artworks from IGDB.",
            "You can also process images using the applyImageEffect tool for locally uploaded files. If a user asks to modify an uploaded image (e.g. 'make it black and white', 'rotate it'), find the image ID in the list of uploaded files below and call the tool.",
            fileListStr ? `The user has uploaded the following files: ${fileListStr}.` : "",
            context ? `Use the following relevant context from these files to inform your response:\n${context}` : (fileListStr ? "The user is asking about the documents, but no specific relevant content was found via vector search. Acknowledge the files exist and ask for more specific questions if needed." : "")
        ].filter(Boolean).join('\n\n');

        const result = streamText({
            model: google('gemini-3.1-flash-lite-preview'),
            messages: modelMessages,
            system: systemPrompt,
            tools: {
                searchGames: tool({
                    description: 'Search for video games on IGDB. Returns game metadata. For images, you can construct higher quality URLs by replacing "t_thumb" in the returned URL with "t_720p" or "t_1080p".',
                    inputSchema: z.object({
                        query: z.string().describe('The name of the game to search for.'),
                        limit: z.number().optional().default(5).describe('The number of results to return.'),
                    }),
                    execute: async ({ query, limit }) => {
                        return await igdbApi.getGames({
                            search: query,
                            limit,
                            fields: ['name', 'id', 'summary', 'first_release_date', 'genres.name', 'platforms.name', 'rating', 'cover.url', 'artworks.url']
                        });
                    },
                }),
                getGameDetails: tool({
                    description: 'Get detailed information about a specific video game. IGDB provides image URLs with a "t_thumb" segment; you should replace this with "t_screenshot_huge" or "t_1080p" for high-res images.',
                    inputSchema: z.object({
                        gameId: z.number().describe('The IGDB ID of the game.'),
                    }),
                    execute: async ({ gameId }) => {
                        return await igdbApi.getGame(gameId, [
                            'name', 'summary', 'storyline', 'first_release_date',
                            'genres.name', 'platforms.name', 'involved_companies.company.name',
                            'rating', 'total_rating', 'cover.url', 'screenshots.url', 'videos.video_id', 'artworks.url'
                        ]);
                    },
                }),
                getSystemInfo: tool({
                    description: 'Get technical metrics about the system (CPU, memory, uptime, node version). Use ONLY when explicitly asked for system stats.',
                    inputSchema: z.object({}),
                    outputSchema: z.object({
                        node_version: z.string(),
                        platform: z.string(),
                        arch: z.string(),
                        uptime: z.number(),
                        memory_usage: z.object({
                            rss: z.string(),
                            heap_total: z.string(),
                            heap_used: z.string(),
                            external: z.string(),
                        }),
                        cpu_usage: z.object({
                            user: z.number(),
                            system: z.number(),
                        }),
                        pid: z.number(),
                    }),
                    execute: async () => {
                        const usage = process.memoryUsage();
                        return {
                            node_version: process.version,
                            platform: process.platform,
                            arch: process.arch,
                            uptime: Math.floor(process.uptime()),
                            memory_usage: {
                                rss: `${Math.round(usage.rss / 1024 / 1024 * 100) / 100} MB`,
                                heap_total: `${Math.round(usage.heapTotal / 1024 / 1024 * 100) / 100} MB`,
                                heap_used: `${Math.round(usage.heapUsed / 1024 / 1024 * 100) / 100} MB`,
                                external: `${Math.round(usage.external / 1024 / 1024 * 100) / 100} MB`,
                            },
                            cpu_usage: process.cpuUsage(),
                            pid: process.pid,
                        };
                    },
                }),
                applyImageEffect: tool({
                    description: 'Apply an effect to an uploaded user image (grayscale, rotate, flip, tint). ONLY works for files the user has uploaded to this chat, NOT for IGDB images.',
                    inputSchema: z.object({
                        fileId: z.string().describe('The MongoDB ObjectId of the uploaded image file.'),
                        effect: z.enum(['grayscale', 'rotate_90', 'rotate_180', 'rotate_270', 'flip', 'tint_blue', 'tint_red', 'tint_green']).describe('The effect to apply to the image.')
                    }),
                    outputSchema: z.object({
                        success: z.boolean(),
                        original_name: z.string(),
                        new_file_id: z.string(),
                        new_file_url: z.string(),
                        message: z.string()
                    }),
                    execute: async ({ fileId, effect }) => {
                        // Validate if fileId is a valid MongoDB ObjectId (24 chars hex)
                        if (!/^[0-9a-fA-F]{24}$/.test(fileId)) {
                            throw new Error(`Invalid fileId: "${fileId}". This tool only accepts 24-character hex MongoDB ObjectIds from the uploaded files list. IGDB numeric IDs are not supported.`);
                        }

                        try {
                            const fileRecord = await mediaRepository.getFileById(fileId);
                            if (!fileRecord || !fileRecord.type.startsWith('image/')) {
                                throw new Error('File not found or is not an image');
                            }

                            const inputBuffer = await fs.readFile(fileRecord.path);
                            let transformer = sharp(inputBuffer);

                            switch (effect) {
                                case 'grayscale': transformer = transformer.grayscale(); break;
                                case 'rotate_90': transformer = transformer.rotate(90); break;
                                case 'rotate_180': transformer = transformer.rotate(180); break;
                                case 'rotate_270': transformer = transformer.rotate(270); break;
                                case 'flip': transformer = transformer.flip(); break;
                                case 'tint_blue': transformer = transformer.tint({ r: 0, g: 0, b: 255 }); break;
                                case 'tint_red': transformer = transformer.tint({ r: 255, g: 0, b: 0 }); break;
                                case 'tint_green': transformer = transformer.tint({ r: 0, g: 255, b: 0 }); break;
                            }

                            const outputBuffer = await transformer.toBuffer();

                            const filename = `processed-${Date.now()}-${fileRecord.name}`;
                            const newPath = `uploads/${filename}`;
                            await fs.writeFile(newPath, outputBuffer);

                            const newFile = await mediaRepository.createFile({
                                name: filename,
                                type: fileRecord.type,
                                size: outputBuffer.length,
                                path: newPath,
                                conversation_id: fileRecord.conversation_id,
                                chunks: []
                            });

                            return {
                                success: true,
                                original_name: fileRecord.name,
                                new_file_id: newFile._id.toString(),
                                new_file_url: `/uploads/${filename}`,
                                message: `Applied ${effect} to ${fileRecord.name}`
                            };
                        } catch (error: any) {
                            console.error('Image processing failed:', error);
                            throw error;
                        }
                    }
                })
            },
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
        const query = req.query.q as string;
        const conversations = await conversationRepository.searchConversations(query);
        return sendResponse({ res, status: HTTP_STATUS_CODES.OK })(conversations);
    } catch (error) {
        return next(error);
    }
};

const getConversationFiles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        const files = await mediaRepository.getFilesByConversationId(id);
        return sendResponse({ res, status: HTTP_STATUS_CODES.OK })(files.map(mapFileToResponse));
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
};
