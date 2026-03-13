import type { Request, Response, NextFunction } from 'express';
import { embedMany } from 'ai';
import { google } from '@ai-sdk/google';
import fs from 'node:fs/promises';
import pdfParse from 'pdf-parse-new';
import { mediaRepository } from '../repository/index';
import { sendResponse } from '../../common/helpers';
import { HTTP_STATUS_CODES } from '../../common/constants/http-status-codes';
import { mapFileToResponse } from '../types/index';

const chunkText = (text: string, chunkSize = 1000, chunkOverlap = 200): string[] => {
    const chunks: string[] = [];
    let start = 0;

    while (start < text.length) {
        let end = Math.min(start + chunkSize, text.length);

        if (end < text.length) {
            const searchWindow = text.substring(start, end + chunkOverlap);
            
            const searchRangeStart = chunkSize - chunkOverlap;
            const searchRangeEnd = Math.min(chunkSize + chunkOverlap, searchWindow.length);
            const range = searchWindow.substring(searchRangeStart, searchRangeEnd);

            const breakPoints = ['\n\n', '\n', ' '];
            let foundBreak = false;

            for (const sep of breakPoints) {
                const index = range.lastIndexOf(sep);
                if (index !== -1) {
                    end = start + searchRangeStart + index + sep.length;
                    foundBreak = true;
                    break;
                }
            }
        }

        const chunk = text.substring(start, end).trim();
        if (chunk) chunks.push(chunk);

        const nextStart = end - chunkOverlap;
        
        start = (nextStart <= start) ? end : nextStart;
    }

    return chunks;
};

const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const file = req.file;
        const { conversation_id } = req.body;

        if (!file) {
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'No file uploaded' });
        }

        if (!conversation_id) {
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'conversation_id is required' });
        }

        let fileChunks: any[] = [];
        const isText = file.mimetype === 'text/plain' || file.originalname.endsWith('.txt');
        const isPdf = file.mimetype === 'application/pdf' || file.originalname.endsWith('.pdf');

        let extractedText = '';

        if (isText) {
            extractedText = await fs.readFile(file.path, 'utf-8');
        } else if (isPdf) {
            const pdfBuffer = await fs.readFile(file.path);
            const data = await pdfParse(pdfBuffer);
            extractedText = data.text;
        }

        if (extractedText.trim()) {
            const chunks = chunkText(extractedText);

            const { embeddings } = await embedMany({
                model: google.textEmbeddingModel('gemini-embedding-001'),
                values: chunks,
            });

            fileChunks = chunks.map((chunk, i) => ({
                text: chunk,
                embedding: embeddings[i],
            }));
        }

        const newFile = await mediaRepository.createFile({
            name: file.originalname,
            type: file.mimetype,
            size: file.size,
            path: file.path,
            conversation_id: conversation_id as any,
            chunks: fileChunks,
        });

        return sendResponse({ res, status: HTTP_STATUS_CODES.CREATED })(mapFileToResponse(newFile));
    } catch (error) {
        return next(error);
    }
};

const getFiles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { conversationId } = req.params;
        const files = await mediaRepository.getFilesByConversationId(conversationId as string);
        return sendResponse({ res, status: HTTP_STATUS_CODES.OK })(files.map(mapFileToResponse));
    } catch (error) {
        return next(error);
    }
};

export const mediaActions = {
    uploadFile,
    getFiles,
};
