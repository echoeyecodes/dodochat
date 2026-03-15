import { AppError } from "../../common/errors/app-error";
import { HTTP_STATUS_CODES } from "../../common/constants/http-status-codes";

export const USER_ERRORS = {
    USER_NOT_FOUND: {
        name: "USER_NOT_FOUND",
        message: "User not found",
    },
    EMAIL_ALREADY_EXISTS: {
        name: "EMAIL_ALREADY_EXISTS",
        message: "Email already exists",
    },
};

export const userNotFoundError = () =>
    new AppError(
        USER_ERRORS.USER_NOT_FOUND.name,
        USER_ERRORS.USER_NOT_FOUND.message,
        HTTP_STATUS_CODES.NOT_FOUND,
    );

export const emailAlreadyExistsError = () =>
    new AppError(
        USER_ERRORS.EMAIL_ALREADY_EXISTS.name,
        USER_ERRORS.EMAIL_ALREADY_EXISTS.message,
        HTTP_STATUS_CODES.BAD_REQUEST,
    );
