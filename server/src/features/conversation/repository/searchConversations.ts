import { Conversation } from "../models/Conversation";
import { getTextFromParts } from "./getTextFromParts";

export const searchConversations = async ({
    user_id,
    query,
}: {
    user_id: string;
    query: string;
}) => {
    if (!query) return [];

    const conversations = await Conversation.find(
        { user_id, $text: { $search: query } },
        {
            score: { $meta: "textScore" },
            title: 1,
            created_at: 1,
            updated_at: 1,
            messages: { $slice: -1 },
        },
    )
        .sort({ score: { $meta: "textScore" } })
        .limit(20)
        .lean();

    return conversations.map((conv) => {
        const lastMsg = conv.messages?.[conv.messages.length - 1];
        const preview = lastMsg ? getTextFromParts(lastMsg.parts) : "";

        return {
            _id: conv._id,
            title: conv.title,
            preview: preview.slice(0, 80),
            created_at: conv.created_at,
            updated_at: conv.updated_at,
        };
    });
};
