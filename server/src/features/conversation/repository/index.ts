import { listConversations } from './listConversations';
import { getConversationById } from './getConversationById';
import { createConversation } from './createConversation';
import { updateConversation } from './updateConversation';
import { deleteConversation } from './deleteConversation';
import { findOrCreateConversation } from './findOrCreateConversation';
import { appendMessages } from './appendMessages';
import { autoTitle } from './autoTitle';
import { searchConversations } from './searchConversations';

export const conversationRepository = {
    listConversations,
    getConversationById,
    createConversation,
    updateConversation,
    deleteConversation,
    findOrCreateConversation,
    appendMessages,
    autoTitle,
    searchConversations,
};
