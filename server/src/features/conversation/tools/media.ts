import { tool } from 'ai';
import { z } from 'zod';
import fs from 'node:fs/promises';
import sharp from 'sharp';
import { mediaRepository } from '../../media/repository';

export const mediaTools = {
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
};
