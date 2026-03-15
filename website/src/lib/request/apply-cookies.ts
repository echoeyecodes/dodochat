import { createIsomorphicFn } from "@tanstack/react-start";

export const applyCookiesFromResponse = createIsomorphicFn()
    .server(async (setCookie: string | string[] | null) => {
        if (!setCookie) return;

        try {
            const { setResponseHeader, getResponseHeader } =
                await import("@tanstack/react-start/server");

            const existing = getResponseHeader("set-cookie") as string | string[] | undefined;
            const newCookies = Array.isArray(setCookie) ? setCookie : [setCookie];

            const merged = existing
                ? Array.isArray(existing)
                    ? [...existing, ...newCookies]
                    : [existing, ...newCookies]
                : newCookies;

            setResponseHeader("set-cookie", merged);
        } catch {}
    })
    .client(() => {
        // No-op on client: browser handles cookies automatically
    });
