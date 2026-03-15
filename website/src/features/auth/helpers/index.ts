import { createServerFn } from "@tanstack/react-start";
import { deleteCookie, getRequestHeaders } from "@tanstack/react-start/server";

export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";

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
