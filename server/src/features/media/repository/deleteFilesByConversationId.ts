import { File } from '../models/File';
import storageService from '@/lib/storage';

export const deleteFilesByConversationId = async (conversationId: string) => {
    const files = await File.find({ conversation_id: conversationId });

    for (const file of files) {
        try {
            await storageService.delete(file.path);
        } catch (error) {
            console.error(`Failed to delete file from storage at ${file.path}:`, error);
        }
    }

    return File.deleteMany({ conversation_id: conversationId });
};
