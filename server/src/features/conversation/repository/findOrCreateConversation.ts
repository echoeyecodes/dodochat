import { Conversation } from '../models/Conversation';

export const findOrCreateConversation = async (conversationId?: string) => {
    if (conversationId) {
        const existing = await Conversation.findById(conversationId);
        if (existing) return existing;
    }
    return new Conversation({ messages: [] });
};
