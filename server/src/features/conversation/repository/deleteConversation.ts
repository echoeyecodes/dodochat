import { Conversation } from '../models/Conversation';
import { conversationNotFoundError } from '../constants/errors';
import { mediaRepository } from '../../media/repository/index';

export const deleteConversation = async (id: string) => {
    const deleted = await Conversation.findByIdAndDelete(id);
    if (!deleted) throw conversationNotFoundError();
    
    await mediaRepository.deleteFilesByConversationId(id);
};
