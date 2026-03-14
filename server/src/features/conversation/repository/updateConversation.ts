import { Conversation } from '../models/Conversation';

export const updateConversation = async ({ user_id, id, updateData }: { user_id: string; id: string; updateData: { title?: string } }) => {
    const updatedConversation = await Conversation.findOneAndUpdate(
        { _id: id, user_id },
        { $set: updateData },
        { new: true, runValidators: true }
    );

    if (!updatedConversation) {
        throw new Error('Conversation not found');
    }

    return updatedConversation;
};
