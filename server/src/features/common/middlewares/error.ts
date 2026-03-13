import type { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS_CODES } from '../constants/http-status-codes';
import { CONVERSATION_ERRORS } from '../../conversation/constants/errors';
import { USER_ERRORS } from '../../user/constants/errors';

const ERROR_NAME_MAPPING: Record<string, number> = {
    [CONVERSATION_ERRORS.CONVERSATION_NOT_FOUND.name]: HTTP_STATUS_CODES.NOT_FOUND,
    [USER_ERRORS.USER_NOT_FOUND.name]: HTTP_STATUS_CODES.NOT_FOUND,
    [USER_ERRORS.EMAIL_ALREADY_EXISTS.name]: HTTP_STATUS_CODES.BAD_REQUEST,
    'VALIDATION_ERROR': HTTP_STATUS_CODES.BAD_REQUEST,
    'RESOURCE_NOT_FOUND': HTTP_STATUS_CODES.NOT_FOUND,
    'BAD_REQUEST': HTTP_STATUS_CODES.BAD_REQUEST,
};

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    let status_code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;

    if (ERROR_NAME_MAPPING[err.name]) {
        status_code = ERROR_NAME_MAPPING[err.name]!;
    } else if (err.code && typeof err.code === 'number' && err.code >= 100 && err.code < 600) {
        status_code = err.code;
    } else if (res.statusCode && res.statusCode !== 200) {
        status_code = res.statusCode;
    }

    console.error(`[${status_code}] ${err.name || 'Error'}:`, err.message);

    return res.status(status_code).json({
        name: err.name || 'Internal Server Error',
        message: err.message,
        code: status_code,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};
