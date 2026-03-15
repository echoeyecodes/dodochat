import { tool } from "ai";
import { z } from "zod";
import PDFDocument from "pdfkit";
import storageService from "@/lib/storage";
import { mediaRepository } from "../../media/repository";
import mongoose from "mongoose";

export const fileTools = {
    generateFile: tool({
        description:
            "Generate a text (.txt) or PDF (.pdf) file from provided content and save it to the chat storage.",
        inputSchema: z.object({
            content: z.string().describe("The content to be written into the file."),
            format: z.enum(["txt", "pdf"]).describe("The format of the file to generate."),
            filename: z
                .string()
                .describe(
                    'The name of the file (e.g. "report", "summary"). Extension will be added automatically.',
                ),
            conversationId: z
                .string()
                .describe("The current conversation ID to associate the file with."),
        }),
        outputSchema: z.object({
            success: z.boolean(),
            file_id: z.string(),
            file_url: z.string(),
            size: z.number(),
            message: z.string(),
        }),
        execute: async ({ content, format, filename, conversationId }) => {
            try {
                let buffer: Buffer;
                let contentType: string;
                let finalFilename: string;

                if (format === "txt") {
                    buffer = Buffer.from(content, "utf-8");
                    contentType = "text/plain";
                    finalFilename = `${filename.replace(/\.[^/.]+$/, "")}.txt`;
                } else {
                    contentType = "application/pdf";
                    finalFilename = `${filename.replace(/\.[^/.]+$/, "")}.pdf`;

                    const chunks: Buffer[] = [];
                    const doc = new PDFDocument();

                    doc.on("data", (chunk) => chunks.push(chunk));

                    const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
                        doc.on("end", () => {
                            resolve(Buffer.concat(chunks));
                        });
                        doc.on("error", reject);

                        doc.fontSize(12).text(content, {
                            align: "left",
                        });
                        doc.end();
                    });

                    buffer = pdfBuffer;
                }

                const key = `uploads/${Date.now()}-${finalFilename}`;

                await storageService.upload({
                    key,
                    body: buffer,
                    contentType,
                });

                const newFile = await mediaRepository.createFile({
                    name: finalFilename,
                    type: contentType,
                    size: buffer.length,
                    path: key,
                    conversation_id: new mongoose.Types.ObjectId(conversationId),
                    chunks: [],
                });

                return {
                    success: true,
                    file_id: newFile._id.toString(),
                    file_url: key,
                    size: buffer.length,
                    message: `Successfully generated ${format.toUpperCase()} file: ${finalFilename}`,
                };
            } catch (error: unknown) {
                console.error("File generation failed:", error);
                throw error;
            }
        },
    }),
};
