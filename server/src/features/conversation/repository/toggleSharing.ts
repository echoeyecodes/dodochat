import { conversationNotFoundError } from "../constants/errors";
import { Conversation, type ConversationDoc } from "../models/Conversation";
import { CONVERSATION_VISIBILITY } from "../constants";
import type { ConversationVisibility } from "../types";
import crypto from "node:crypto";
import mongoose from "mongoose";

export const toggleSharing = async ({
    user_id,
    id,
    visibility,
}: {
    user_id: string;
    id: string;
    visibility: ConversationVisibility;
}) => {
    const isPublic = visibility === CONVERSATION_VISIBILITY.PUBLIC;

    let finalUpdate: Record<string, unknown> = { visibility };

    if (isPublic) {
        finalUpdate.share_token = crypto.randomBytes(9).toString("base64url");
    } else {
        finalUpdate = {
            $set: { visibility: CONVERSATION_VISIBILITY.PRIVATE },
            $unset: { share_token: "" },
        } as Record<string, unknown>;
    }

    const updatedConversation = await Conversation.findOneAndUpdate(
        { _id: id, user_id },
        isPublic
            ? { $set: finalUpdate }
            : (finalUpdate as unknown as mongoose.UpdateQuery<ConversationDoc>),
        { new: true, runValidators: true },
    );

    if (!updatedConversation) {
        throw conversationNotFoundError();
    }

    return updatedConversation;
};
