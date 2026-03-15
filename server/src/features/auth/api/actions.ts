import type { NextFunction, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRepository } from "../../user/repository/index";
import { authRepository } from "../repository/index";
import type { LoginInput } from "./req-schema";
import {
    ACCESS_TOKEN_EXPIRES_IN,
    ACCESS_TOKEN_MAX_AGE,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_MAX_AGE,
    REFRESH_TOKEN_SECRET,
} from "../constants/index";
import { AUTH_ERRORS, invalidCredentialsError } from "../constants/errors";
import { USER_ERRORS } from "../../user/constants/errors";
import type { AuthRequest } from "../../common/types/request";
import { sendResponse } from "../../common/helpers";
import envConfig from "@/lib/env";
import { HTTP_STATUS_CODES } from "@/features/common/constants/http-status-codes";
import { notAuthenticatedError } from "@/features/common/constants/errors";
import { hashToken } from "../helpers";

import { verifyFirebaseToken } from "../helpers/firebase";
import type { auth } from "firebase-admin";

const generateTokens = (userId: string) => {
    const access_token = jwt.sign({ sub: userId }, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });
    const refresh_token = jwt.sign({ sub: userId }, REFRESH_TOKEN_SECRET);
    const access_token_expires_at = new Date(Date.now() + ACCESS_TOKEN_MAX_AGE);
    return { access_token, refresh_token, access_token_expires_at };
};

const setTokenCookies = (res: Response, access_token: string, refresh_token: string) => {
    const domain = envConfig.get("COOKIE_DOMAIN");
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        path: "/",
        domain: domain || undefined,
    };

    res.cookie("access_token", access_token, {
        ...cookieOptions,
        maxAge: ACCESS_TOKEN_MAX_AGE,
    });
    res.cookie("refresh_token", refresh_token, {
        ...cookieOptions,
        maxAge: REFRESH_TOKEN_MAX_AGE,
    });
};

export const login = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { email, password, firebase_token } = req.body as LoginInput;

        let userEmail = email;

        let decodedFirebaseToken: auth.DecodedIdToken | null = null;

        if (firebase_token) {
            decodedFirebaseToken = await verifyFirebaseToken(firebase_token);
            if (!decodedFirebaseToken.email) {
                throw notAuthenticatedError();
            }
            userEmail = decodedFirebaseToken.email;
        }

        if (!userEmail) {
            throw invalidCredentialsError();
        }

        let user = await userRepository.getUserByEmail(userEmail).catch((err) => {
            if (err.name === USER_ERRORS.USER_NOT_FOUND.name) {
                return null;
            }
            throw err;
        });

        if (!firebase_token) {
            if (!user || !user.password) {
                throw invalidCredentialsError();
            }
            const isMatch = await bcrypt.compare(password!, user.password);
            if (!isMatch) {
                throw invalidCredentialsError();
            }
        } else {
            if (!user) {
                user = await userRepository.createUser({
                    email: userEmail,
                    display_name: decodedFirebaseToken?.name || userEmail.split("@")[0],
                    avatar_url: decodedFirebaseToken?.picture || undefined,
                });
            }
        }

        const { access_token, refresh_token, access_token_expires_at } = generateTokens(
            user!._id.toString(),
        );

        const authToken = await authRepository.createAuthToken({
            user_id: user!._id.toString(),
            access_token: hashToken(access_token),
            refresh_token: hashToken(refresh_token),
            access_token_expires_at,
            ip_address: req.ip_address,
            device_name: req.device_name,
            ip_country: req.ip_country,
        });

        setTokenCookies(res, access_token, refresh_token);

        sendResponse({ res, status: HTTP_STATUS_CODES.OK })({
            ...authToken,
            access_token,
            refresh_token,
        });
    } catch (error) {
        return next(error);
    }
};

export const refreshAccessToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const refresh_token = req.cookies.refresh_token;
        if (!refresh_token) {
            throw invalidCredentialsError();
        }

        let decoded: { sub: string } | null = null;

        try {
            decoded = jwt.verify(refresh_token, REFRESH_TOKEN_SECRET) as { sub: string };
        } catch {
            // Ignore errors, we check decoded value next
        }
        if (!decoded) throw notAuthenticatedError();

        const existingToken = await authRepository
            .getAuthToken({ refresh_token: hashToken(refresh_token) })
            .catch((error) => {
                if (error.name === AUTH_ERRORS.AUTH_TOKEN_NOT_FOUND.name) {
                    return null;
                }
                throw error;
            });
        if (!existingToken) throw notAuthenticatedError();

        await authRepository.deleteAuthToken(existingToken.access_token);

        const { access_token: newAccessToken, access_token_expires_at } = generateTokens(
            decoded.sub,
        );

        const authToken = await authRepository.createAuthToken({
            user_id: decoded.sub,
            access_token: hashToken(newAccessToken),
            refresh_token: hashToken(refresh_token),
            access_token_expires_at: access_token_expires_at,
            ip_address: req.ip_address,
            device_name: req.device_name,
            ip_country: req.ip_country,
        });

        setTokenCookies(res, newAccessToken, refresh_token);

        return sendResponse({ res, status: HTTP_STATUS_CODES.OK })({
            ...authToken,
            access_token: newAccessToken,
            refresh_token,
        });
    } catch (error) {
        return next(error);
    }
};

export const logout = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const access_token = req.cookies.access_token;
        if (access_token) {
            await authRepository.deleteAuthToken(hashToken(access_token));
        }
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        return next(error);
    }
};
