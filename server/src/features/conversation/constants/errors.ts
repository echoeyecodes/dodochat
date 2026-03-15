import { AppError } from "../../common/errors/app-error";
import { HTTP_STATUS_CODES } from "../../common/constants/http-status-codes";

export const CONVERSATION_ERRORS = {
    CONVERSATION_NOT_FOUND: {
        name: "CONVERSATION_NOT_FOUND",
        message: "Conversation not found",
    },
};

export const conversationNotFoundError = () =>
    new AppError(
        CONVERSATION_ERRORS.CONVERSATION_NOT_FOUND.name,
        CONVERSATION_ERRORS.CONVERSATION_NOT_FOUND.message,
        HTTP_STATUS_CODES.NOT_FOUND,
    );
