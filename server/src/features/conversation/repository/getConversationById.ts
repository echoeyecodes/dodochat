import { Conversation } from "../models/Conversation";
import { conversationNotFoundError } from "../constants/errors";

export const getConversationById = async ({ user_id, id }: { user_id: string; id: string }) => {
    const conversation = await Conversation.findOne({ _id: id, user_id }).lean();
    if (!conversation) throw conversationNotFoundError();

    return {
        _id: conversation._id,
        title: conversation.title,
        messages: conversation.messages,
        visibility: conversation.visibility,
        share_token: conversation.share_token,
        created_at: conversation.created_at,
        updated_at: conversation.updated_at,
    };
};
