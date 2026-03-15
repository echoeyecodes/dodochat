import { AppError } from "../errors/app-error";
import { HTTP_STATUS_CODES } from "../constants/http-status-codes";

export const notAuthenticatedError = () =>
    new AppError("NOT_AUTHENTICATED", "Not authenticated", HTTP_STATUS_CODES.UNAUTHORIZED);
