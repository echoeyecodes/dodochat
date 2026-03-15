import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { AuthRequest } from "../types/request";
import { hashToken } from "@/features/auth/helpers";
import { ACCESS_TOKEN_SECRET } from "@/features/auth/constants";
import { authCache } from "@/features/auth/helpers/auth-cache";

const attachUserToRequest = async (req: AuthRequest, _: Response, next: NextFunction) => {
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
        if (isExpired) return next();

        req.user_id = decoded.sub;
    } catch {
        // JWT invalid or token not in DB
    }

    return next();
};

export default attachUserToRequest;
