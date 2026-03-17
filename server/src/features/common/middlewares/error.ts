import type { Request, Response, NextFunction } from "express";
import { HTTP_STATUS_CODES } from "../constants/http-status-codes";
import { CONVERSATION_ERRORS } from "../../conversation/constants/errors";
import { USER_ERRORS } from "../../user/constants/errors";
import { MediaResourceErrorNames } from "@/features/music-resolve/constants/errors";

const ERROR_NAME_MAPPING: Record<string, number> = {
    [CONVERSATION_ERRORS.CONVERSATION_NOT_FOUND.name]: HTTP_STATUS_CODES.NOT_FOUND,
    [USER_ERRORS.USER_NOT_FOUND.name]: HTTP_STATUS_CODES.NOT_FOUND,
    [USER_ERRORS.EMAIL_ALREADY_EXISTS.name]: HTTP_STATUS_CODES.BAD_REQUEST,
    [MediaResourceErrorNames.MEDIA_RESOURCE_NOT_FOUND]: HTTP_STATUS_CODES.NOT_FOUND,
    VALIDATION_ERROR: HTTP_STATUS_CODES.BAD_REQUEST,
    RESOURCE_NOT_FOUND: HTTP_STATUS_CODES.NOT_FOUND,
    BAD_REQUEST: HTTP_STATUS_CODES.BAD_REQUEST,
};

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    let status_code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
    const error = err as Error & { code?: number; name: string };

    if (ERROR_NAME_MAPPING[error.name]) {
        status_code = ERROR_NAME_MAPPING[error.name]!;
    } else if (
        error.code &&
        typeof error.code === "number" &&
        error.code >= 100 &&
        error.code < 600
    ) {
        status_code = error.code;
    } else if (res.statusCode && res.statusCode !== 200) {
        status_code = res.statusCode;
    }

    console.error(`[${status_code}] ${error.name || "Error"}:`, error.message);

    return res.status(status_code).json({
        name: error.name || "Internal Server Error",
        message: error.message,
        code: status_code,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });
};
