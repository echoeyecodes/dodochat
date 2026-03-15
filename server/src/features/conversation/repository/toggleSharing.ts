import { conversationNotFoundError } from '../constants/errors';
import { Conversation } from '../models/Conversation';
import { CONVERSATION_VISIBILITY } from '../constants';
import type { ConversationVisibility } from '../types';
import crypto from 'node:crypto';

export const toggleSharing = async ({ user_id, id, visibility }: { user_id: string; id: string; visibility: ConversationVisibility }) => {
    const isPublic = visibility === CONVERSATION_VISIBILITY.PUBLIC;
    
    let finalUpdate: any = { visibility };
    
    if (isPublic) {
        finalUpdate.share_token = crypto.randomBytes(9).toString('base64url');
    } else {
        finalUpdate = {
            $set: { visibility: CONVERSATION_VISIBILITY.PRIVATE },
            $unset: { share_token: "" }
        };
    }

    const updatedConversation = await Conversation.findOneAndUpdate(
        { _id: id, user_id },
        isPublic ? { $set: finalUpdate } : finalUpdate,
        { new: true, runValidators: true }
    );

    if (!updatedConversation) {
        throw conversationNotFoundError()
    }

    return updatedConversation;
};
