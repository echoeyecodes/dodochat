import { createServerFn } from "@tanstack/react-start";
import {
    deleteCookie,
    getCookies,
    getRequestHeaders,
    setCookie,
} from "@tanstack/react-start/server";
import { z } from "zod";

export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";

export const updateAuthSession = createServerFn({ method: "POST" })
    .inputValidator(
        z.object({
            access_token: z.string().optional(),
            refresh_token: z.string().optional(),
        }),
    )
    .handler(async ({ data }) => {
        const headers = getRequestHeaders();
        const host = headers.get("host");
        let domain: string | undefined = undefined;

        if (host && !host.includes("localhost") && !host.includes("127.0.0.1")) {
            const parts = host.split(":")[0].split(".");
            if (parts.length >= 2) {
                domain = "." + parts.slice(-2).join(".");
            }
        }

        const isProduction = process.env.NODE_ENV === "production";

        if (data.access_token) {
            setCookie(ACCESS_TOKEN_KEY, data.access_token, {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24 * 30, // 30 days
                secure: isProduction,
                domain,
            });
        }
        if (data.refresh_token) {
            setCookie(REFRESH_TOKEN_KEY, data.refresh_token, {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24 * 30, // 30 days
                secure: isProduction,
                domain,
            });
        }
    });

export const deleteAccessToken = createServerFn({ method: "POST" }).handler(async () => {
    const headers = getRequestHeaders();
    const host = headers.get("host");
    let domain: string | undefined = undefined;

    if (host && !host.includes("localhost") && !host.includes("127.0.0.1")) {
        const parts = host.split(":")[0].split(".");
        if (parts.length >= 2) {
            domain = "." + parts.slice(-2).join(".");
        }
    }

    const isProduction = process.env.NODE_ENV === "production";

    deleteCookie(ACCESS_TOKEN_KEY, {
        path: "/",
        domain,
        secure: isProduction,
        sameSite: "lax",
        httpOnly: true,
    });
    deleteCookie(REFRESH_TOKEN_KEY, {
        path: "/",
        domain,
        secure: isProduction,
        sameSite: "lax",
        httpOnly: true,
    });
});

export const getAccessToken = createServerFn({ method: "GET" }).handler(() => {
    const cookies = getCookies();
    return {
        access_token: cookies[ACCESS_TOKEN_KEY] as string | undefined,
        refresh_token: cookies[REFRESH_TOKEN_KEY] as string | undefined,
    };
});
