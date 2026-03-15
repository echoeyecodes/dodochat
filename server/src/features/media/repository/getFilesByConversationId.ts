import { File, type FileDoc } from "../models/File";

export const getFilesByConversationId = async (conversationId: string): Promise<FileDoc[]> => {
    return await File.find({ conversation_id: conversationId });
};
