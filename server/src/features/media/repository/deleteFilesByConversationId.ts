import { File } from '../models/File';
import fs from 'node:fs/promises';

export const deleteFilesByConversationId = async (conversationId: string) => {
    const files = await File.find({ conversation_id: conversationId });
    
    for (const file of files) {
        try {
            await fs.unlink(file.path);
        } catch (error) {
            console.error(`Failed to delete physical file at ${file.path}:`, error);
        }
    }
    
    return File.deleteMany({ conversation_id: conversationId });
};
