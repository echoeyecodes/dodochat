import { Conversation } from "../models/Conversation";
import { conversationNotFoundError } from "../constants/errors";
import { mediaRepository } from "../../media/repository/index";

export const deleteConversation = async ({ user_id, id }: { user_id: string; id: string }) => {
    const deleted = await Conversation.findOneAndDelete({ _id: id, user_id });
    if (!deleted) throw conversationNotFoundError();

    await mediaRepository.deleteFilesByConversationId(id);
};
