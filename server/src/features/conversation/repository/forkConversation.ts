import { conversationNotFoundError } from "../constants/errors";
import { Conversation, type ConversationDoc } from "../models/Conversation";
import { CONVERSATION_VISIBILITY } from "../constants";
import type { Message } from "../types";

export const forkConversation = async ({
    user_id,
    share_token,
}: {
    user_id: string;
    share_token: string;
}) => {
    const original = (await Conversation.findOne({
        share_token,
        visibility: CONVERSATION_VISIBILITY.PUBLIC,
    }).lean()) as ConversationDoc | null;

    if (!original) {
        throw conversationNotFoundError();
    }

    const conversation = new Conversation({
        user_id,
        title: `${original.title} (Forked)`,
        messages: (original.messages || []).map((m: Message) => ({
            ...m,
            created_at: new Date(),
        })),
        visibility: CONVERSATION_VISIBILITY.PRIVATE,
    });

    await conversation.save();
    return conversation;
};
