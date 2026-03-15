import { createIsomorphicFn } from "@tanstack/react-start";

export const applyCookiesFromResponse = createIsomorphicFn()
    .server(async (setCookie: string | null) => {
        if (!setCookie) return;

        try {
            const { setResponseHeader, getResponseHeader } =
                await import("@tanstack/react-start/server");

            const existing = getResponseHeader("set-cookie") as string | string[] | undefined;
            const merged = existing
                ? Array.isArray(existing)
                    ? [...existing, setCookie]
                    : [existing, setCookie]
                : setCookie;

            setResponseHeader("set-cookie", merged);
        } catch {}
    })
    .client(() => {
        // No-op on client: browser handles cookies automatically
    });
