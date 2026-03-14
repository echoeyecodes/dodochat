import express from 'express';
import { conversationActions } from './actions';
import { validate } from '../../common/middlewares/validate';
import { GetConversationSchema, DeleteConversationSchema, ChatSchema, SearchConversationsSchema, UpdateConversationSchema } from './req-schema';
import isAuthenticated from '../../common/middlewares/isAuthenticated';

const router = express.Router();

router.get('/', isAuthenticated, conversationActions.listConversations);
router.get('/search', isAuthenticated, validate(SearchConversationsSchema), conversationActions.searchConversations);
router.get('/:id', isAuthenticated, validate(GetConversationSchema), conversationActions.getConversation);
router.get('/:id/files', isAuthenticated, validate(GetConversationSchema), conversationActions.getConversationFiles);
router.post('/', isAuthenticated, conversationActions.createConversation);
router.patch('/:id', isAuthenticated, validate(UpdateConversationSchema), conversationActions.updateConversation);
router.delete('/:id', isAuthenticated, validate(DeleteConversationSchema), conversationActions.deleteConversation);
router.post('/chat', isAuthenticated, validate(ChatSchema), conversationActions.chat);

export default router;
