import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { AuthRequest } from "../types/request";
import { hashToken, setTokenCookies } from "@/features/auth/helpers";
import {
    ACCESS_TOKEN_EXPIRES_IN,
    ACCESS_TOKEN_MAX_AGE,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
} from "@/features/auth/constants";
import { authCache } from "@/features/auth/helpers/auth-cache";
import { authRepository } from "@/features/auth/repository";

export const refreshTokens = async (req: AuthRequest, res: Response, refresh_token: string) => {
    let decoded: { sub: string } | null = null;

    try {
        decoded = jwt.verify(refresh_token, REFRESH_TOKEN_SECRET) as { sub: string };
    } catch {
        return null;
    }

    if (!decoded?.sub) return null;

    const existingToken = await authRepository
        .getAuthToken({ refresh_token: hashToken(refresh_token) })
        .catch(() => null);

    if (!existingToken) return null;

    await authRepository.deleteAuthToken(existingToken.access_token);

    const newAccessToken = jwt.sign({ sub: decoded.sub }, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });
    const access_token_expires_at = new Date(Date.now() + ACCESS_TOKEN_MAX_AGE);

    const authToken = await authRepository.createAuthToken({
        user_id: decoded.sub,
        access_token: hashToken(newAccessToken),
        refresh_token: hashToken(refresh_token),
        access_token_expires_at,
        ip_address: req.ip_address,
        device_name: req.device_name,
        ip_country: req.ip_country,
    });

    setTokenCookies(res, newAccessToken, refresh_token);

    return {
        ...authToken,
        access_token: newAccessToken,
        refresh_token,
    };
};

const attachUserToRequest = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token = req.headers.authorization
        ? req.headers.authorization.replace("Bearer ", "")
        : undefined;

    if (!token) {
        token = req.cookies?.access_token;
    }

    if (!token) return next();

    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as { sub: string };
        if (!decoded.sub) return next();

        const authToken = await authCache.getAuthToken(hashToken(token));
        if (!authToken) return next();

        const isExpired = new Date(authToken.access_token_expires_at) < new Date();
        if (isExpired) {
            const refresh_token = req.cookies?.refresh_token;
            if (refresh_token) {
                const authToken = await refreshTokens(req, res, refresh_token);
                if (authToken) {
                    req.user_id = authToken.user_id.toString();
                }
            }
            return next();
        }

        req.user_id = decoded.sub;
    } catch {
        // JWT invalid or token not in DB
    }

    return next();
};

export default attachUserToRequest;
