import { createServerFn } from "@tanstack/react-start";
import { setCookie, deleteCookie, getRequestHeaders } from "@tanstack/react-start/server";
import { z } from "zod";

export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";

const getCookieOptions = () => {
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

    return {
        httpOnly: true,
        sameSite: "lax" as const,
        path: "/",
        secure: isProduction,
        domain,
    };
};

export const updateAuthSession = createServerFn({ method: "POST" })
    .inputValidator(
        z.object({
            access_token: z.string().optional(),
            refresh_token: z.string().optional(),
        }),
    )
    .handler(async ({ data }) => {
        const options = getCookieOptions();
        const setOptions = {
            ...options,
            maxAge: 60 * 60 * 24 * 30, // 30 days
        };

        if (data.access_token) {
            deleteCookie(ACCESS_TOKEN_KEY, { ...options, domain: undefined });
            if (options.domain) {
                deleteCookie(ACCESS_TOKEN_KEY, options);
            }
            setCookie(ACCESS_TOKEN_KEY, data.access_token, setOptions);
        }

        if (data.refresh_token) {
            deleteCookie(REFRESH_TOKEN_KEY, { ...options, domain: undefined });
            if (options.domain) {
                deleteCookie(REFRESH_TOKEN_KEY, options);
            }
            setCookie(REFRESH_TOKEN_KEY, data.refresh_token, setOptions);
        }
    });

export const deleteAccessToken = createServerFn({ method: "POST" }).handler(async () => {
    const options = getCookieOptions();

    deleteCookie(ACCESS_TOKEN_KEY, { ...options, domain: undefined });
    deleteCookie(REFRESH_TOKEN_KEY, { ...options, domain: undefined });

    if (options.domain) {
        deleteCookie(ACCESS_TOKEN_KEY, options);
        deleteCookie(REFRESH_TOKEN_KEY, options);
    }
});
