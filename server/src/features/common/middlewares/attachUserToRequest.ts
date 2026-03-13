import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { AuthRequest } from '../types/request';
import { authRepository } from '../../auth/repository/index';
import { hashToken } from '@/features/auth/helpers';
import { ACCESS_TOKEN_SECRET } from '@/features/auth/constants';
import { AUTH_ERRORS } from '@/features/auth/constants/errors';

const attachUserToRequest = async (
    req: AuthRequest,
    _: Response,
    next: NextFunction
) => {
    let token = req.headers.authorization
        ? req.headers.authorization.replace('Bearer ', '')
        : undefined;

    if (!token) {
        const cookieToken = req.cookies?.access_token;
        if (!cookieToken) return next();
        token = cookieToken;
    }

    try {
        const decoded = jwt.verify(token!, ACCESS_TOKEN_SECRET) as { sub: string };
        if (!decoded.sub) return next();

        // Confirm token exists in DB and is not expired
        const authToken = await authRepository.getAuthToken({ access_token: hashToken(token!) }).catch((error) => {
            if (error.name === AUTH_ERRORS.AUTH_TOKEN_NOT_FOUND.name) {
                return null
            }
            throw error
        });
        if (!authToken) return next()
        const isExpired = new Date(authToken.access_token_expires_at) < new Date();
        if (isExpired) return next();

        req.user_id = decoded.sub;
    } catch {
        // JWT invalid or token not in DB
    }

    return next();
};

export default attachUserToRequest;
