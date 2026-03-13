import { Conversation } from '../models/Conversation';
import { conversationNotFoundError } from '../constants/errors';

export const getConversationById = async (id: string) => {
    const conversation = await Conversation.findById(id).lean();
    if (!conversation) throw conversationNotFoundError();

    return {
        _id: conversation._id,
        title: conversation.title,
        messages: conversation.messages,
        created_at: conversation.created_at,
        updated_at: conversation.updated_at,
    };
};
