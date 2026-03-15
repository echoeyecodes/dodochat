import type { ConversationDoc } from "../models/Conversation";
import type { Message } from "../types/index";

export const appendMessages = async (conversation: ConversationDoc, newMessages: Message[]) => {
    for (const msg of newMessages) {
        conversation.messages.push(msg);
    }
    await conversation.save();
};
