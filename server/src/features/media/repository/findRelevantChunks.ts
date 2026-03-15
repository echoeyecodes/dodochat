import { File } from "../models/File";

export const findRelevantChunks = async (
    conversationId: string,
    queryEmbedding: number[],
    limit: number = 5,
) => {
    const files = await File.find({ conversation_id: conversationId });

    const allChunks: { text: string; score: number }[] = [];

    for (const file of files) {
        for (const chunk of file.chunks) {
            const score = cosineSimilarity(queryEmbedding, chunk.embedding);
            allChunks.push({ text: chunk.text, score });
        }
    }

    return allChunks.sort((a, b) => b.score - a.score).slice(0, limit);
};

const cosineSimilarity = (vecA: number[], vecB: number[]): number => {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i]! * vecB[i]!;
        normA += vecA[i]! * vecA[i]!;
        normB += vecB[i]! * vecB[i]!;
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};
