import { Conversation } from "../models/Conversation";

export const findOrCreateConversation = async ({
    user_id,
    conversationId,
}: {
    user_id: string;
    conversationId?: string;
}) => {
    if (conversationId) {
        const existing = await Conversation.findOne({ _id: conversationId, user_id });
        if (existing) return existing;
    }
    return new Conversation({ user_id, messages: [] });
};
