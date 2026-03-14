import { Conversation } from '../models/Conversation';
import { getTextFromParts } from './getTextFromParts';

export const listConversations = async ({ user_id }: { user_id: string }) => {
    const conversations = await Conversation.find(
        { user_id },
        {
            title: 1,
            created_at: 1,
            updated_at: 1,
            messages: { $slice: -1 }
        }
    )
        .sort({ updated_at: -1 })
        .lean();

    return conversations.map((conv) => {
        const lastMsg = conv.messages?.[conv.messages.length - 1];
        const preview = lastMsg ? getTextFromParts(lastMsg.parts) : '';

        return {
            _id: conv._id,
            title: conv.title,
            preview: preview.slice(0, 80),
            created_at: conv.created_at,
            updated_at: conv.updated_at,
        };
    });
};
