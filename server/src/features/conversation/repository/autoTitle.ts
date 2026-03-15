import type { ConversationDoc } from "../models/Conversation";
import { getTextFromParts } from "./getTextFromParts";

export const autoTitle = async (conversation: ConversationDoc) => {
    if (conversation.title !== "New Chat" || conversation.messages.length === 0) return;

    const firstUserMsg = conversation.messages.find((m) => m.role === "user");
    if (!firstUserMsg) return;

    const text = getTextFromParts(firstUserMsg.parts) || "New Chat";
    conversation.title = text.slice(0, 60);
    await conversation.save();
};
