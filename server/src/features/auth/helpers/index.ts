import crypto from "crypto";
import { type Response } from "express";
import { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE, AUTH_TOKEN_SECRET } from "../constants";
import envConfig from "@/lib/env";

export const hashToken = (token: string): string => {
    return crypto.createHmac("sha256", AUTH_TOKEN_SECRET).update(token).digest("hex");
};

export const setTokenCookies = (res: Response, access_token: string, refresh_token: string) => {
    const domain = envConfig.get("COOKIE_DOMAIN");
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? ("none" as const) : ("lax" as const),
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
