import { Conversation } from '../models/Conversation';

export const createConversation = async () => {
    const conversation = new Conversation({ messages: [] });
    await conversation.save();
    return { _id: conversation._id, title: conversation.title };
};
