import { Conversation } from "../models/Conversation";
import { conversationNotFoundError } from "../constants/errors";
import { CONVERSATION_VISIBILITY } from "../constants";

export const getSharedConversation = async ({ token }: { token: string }) => {
    const conversation = await Conversation.findOne({
        share_token: token,
        visibility: CONVERSATION_VISIBILITY.PUBLIC,
    }).lean();
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
