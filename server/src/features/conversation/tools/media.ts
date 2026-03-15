import { tool } from "ai";
import { z } from "zod";
import storageService from "@/lib/storage";
import sharp from "sharp";
import { mediaRepository } from "../../media/repository";
import mongoose from "mongoose";

export const mediaTools = {
    applyImageEffect: tool({
        description:
            "Apply an effect to an image (grayscale, rotate, flip, tint). Works for both uploaded chat files (using fileId) and external images like IGDB covers (using imageUrl).",
        inputSchema: z.object({
            fileId: z
                .string()
                .optional()
                .describe("The MongoDB ObjectId of the uploaded image file."),
            imageUrl: z
                .string()
                .optional()
                .describe("The absolute URL of an external image (e.g. from IGDB)."),
            effect: z
                .enum([
                    "grayscale",
                    "rotate_90",
                    "rotate_180",
                    "rotate_270",
                    "flip",
                    "tint_blue",
                    "tint_red",
                    "tint_green",
                ])
                .describe("The effect to apply to the image."),
            conversationId: z
                .string()
                .describe("The current conversation ID to associate the processed image with."),
        }),
        outputSchema: z.object({
            success: z.boolean(),
            original_name: z.string(),
            new_file_id: z.string(),
            new_file_url: z.string(),
            message: z.string(),
        }),
        execute: async ({ fileId, imageUrl, effect, conversationId }) => {
            try {
                let inputBuffer: Buffer;
                let originalName: string;
                let contentType: string;

                if (fileId) {
                    // Validate if fileId is a valid MongoDB ObjectId (24 chars hex)
                    if (!/^[0-9a-fA-F]{24}$/.test(fileId)) {
                        throw new Error(
                            `Invalid fileId: "${fileId}". This tool only accepts 24-character hex MongoDB ObjectIds from the uploaded files list.`,
                        );
                    }
                    const fileRecord = await mediaRepository.getFileById(fileId);
                    if (!fileRecord || !fileRecord.type.startsWith("image/")) {
                        throw new Error("File not found or is not an image");
                    }
                    inputBuffer = await storageService.get(fileRecord.path);
                    originalName = fileRecord.name;
                    contentType = fileRecord.type;
                } else if (imageUrl) {
                    const response = await fetch(imageUrl);
                    if (!response.ok)
                        throw new Error(`Failed to fetch image from URL: ${imageUrl}`);
                    const arrayBuffer = await response.arrayBuffer();
                    inputBuffer = Buffer.from(arrayBuffer);
                    const urlPath = new URL(imageUrl).pathname;
                    originalName = urlPath.split("/").pop() || "external-image.jpg";
                    contentType = response.headers.get("content-type") || "image/jpeg";
                } else {
                    throw new Error("Either fileId or imageUrl must be provided");
                }

                let transformer = sharp(inputBuffer);

                switch (effect) {
                    case "grayscale":
                        transformer = transformer.grayscale();
                        break;
                    case "rotate_90":
                        transformer = transformer.rotate(90);
                        break;
                    case "rotate_180":
                        transformer = transformer.rotate(180);
                        break;
                    case "rotate_270":
                        transformer = transformer.rotate(270);
                        break;
                    case "flip":
                        transformer = transformer.flip();
                        break;
                    case "tint_blue":
                        transformer = transformer.tint({ r: 0, g: 0, b: 255 });
                        break;
                    case "tint_red":
                        transformer = transformer.tint({ r: 255, g: 0, b: 0 });
                        break;
                    case "tint_green":
                        transformer = transformer.tint({ r: 0, g: 255, b: 0 });
                        break;
                }

                const outputBuffer = await transformer.toBuffer();

                const filename = `processed-${Date.now()}-${originalName}`;
                const newKey = `uploads/${filename}`;

                await storageService.upload({
                    key: newKey,
                    body: outputBuffer,
                    contentType: contentType,
                });

                const newFile = await mediaRepository.createFile({
                    name: filename,
                    type: contentType,
                    size: outputBuffer.length,
                    path: newKey,
                    conversation_id: new mongoose.Types.ObjectId(conversationId),
                    chunks: [],
                });

                return {
                    success: true,
                    original_name: originalName,
                    new_file_id: newFile._id.toString(),
                    new_file_url: newKey,
                    message: `Applied ${effect} to ${originalName}`,
                };
            } catch (error: unknown) {
                console.error("Image processing failed:", error);
                throw error;
            }
        },
    }),
};
