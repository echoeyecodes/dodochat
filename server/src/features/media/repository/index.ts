import { createFile } from "./createFile";
import { getFilesByConversationId } from "./getFilesByConversationId";
import { findRelevantChunks } from "./findRelevantChunks";
import { deleteFilesByConversationId } from "./deleteFilesByConversationId";
import { getFileById } from "./getFileById";

export const mediaRepository = {
    createFile,
    getFilesByConversationId,
    findRelevantChunks,
    deleteFilesByConversationId,
    getFileById,
};
