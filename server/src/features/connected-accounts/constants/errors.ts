import { AppError } from "../../common/errors/app-error";

export const CONNECTED_ACCOUNT_ERRORS = {
    CONNECTED_ACCOUNT_NOT_FOUND: {
        name: "CONNECTED_ACCOUNT_NOT_FOUND",
        message: "Connected account not found",
    },
};

export const connectedAccountNotFoundError = ({ message }: { message?: string }) =>
    new AppError(
        CONNECTED_ACCOUNT_ERRORS.CONNECTED_ACCOUNT_NOT_FOUND.name,
        message ?? CONNECTED_ACCOUNT_ERRORS.CONNECTED_ACCOUNT_NOT_FOUND.message,
    );
