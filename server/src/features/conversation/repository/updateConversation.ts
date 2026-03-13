import { Conversation } from '../models/Conversation';

export const updateConversation = async (id: string, updateData: { title?: string }) => {
    const updatedConversation = await Conversation.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    );

    if (!updatedConversation) {
        throw new Error('Conversation not found');
    }

    return updatedConversation;
};
