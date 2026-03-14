import { Conversation } from '../models/Conversation';

export const createConversation = async ({ user_id }: { user_id: string }) => {
    const conversation = new Conversation({ user_id, messages: [] });
    await conversation.save();
    return { _id: conversation._id, title: conversation.title };
};
