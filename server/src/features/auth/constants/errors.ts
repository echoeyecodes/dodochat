import { AppError } from "../../common/errors/app-error";
import { HTTP_STATUS_CODES } from "../../common/constants/http-status-codes";

export const AUTH_ERRORS = {
    AUTH_TOKEN_NOT_FOUND: {
        name: "AUTH_TOKEN_NOT_FOUND",
        message: "Auth token not found",
    },
    INVALID_CREDENTIALS: {
        name: "INVALID_CREDENTIALS",
        message: "Invalid email or password",
    },
};

export const authTokenNotFoundError = () =>
    new AppError(
        AUTH_ERRORS.AUTH_TOKEN_NOT_FOUND.name,
        AUTH_ERRORS.AUTH_TOKEN_NOT_FOUND.message,
        HTTP_STATUS_CODES.NOT_FOUND,
    );

export const invalidCredentialsError = () =>
    new AppError(
        AUTH_ERRORS.INVALID_CREDENTIALS.name,
        AUTH_ERRORS.INVALID_CREDENTIALS.message,
        HTTP_STATUS_CODES.UNAUTHORIZED,
    );
