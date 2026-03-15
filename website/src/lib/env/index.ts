import { createIsomorphicFn } from "@tanstack/react-start";
import { z } from "zod";

const envSchema = z.object({
    BASE_API_URL: z.url(),
    CDN_URL: z.url(),
    FIREBASE_API_KEY: z.string().optional(),
    FIREBASE_AUTH_DOMAIN: z.string().optional(),
    FIREBASE_PROJECT_ID: z.string().optional(),
    FIREBASE_STORAGE_BUCKET: z.string().optional(),
    FIREBASE_MESSAGING_SENDER_ID: z.string().optional(),
    FIREBASE_APP_ID: z.string().optional(),
});

const envConfig = (() => {
    const env = envSchema.parse(process.env);
    return {
        get: createIsomorphicFn()
            .server((key: keyof typeof env) => {
                const value = env[key];
                return value;
            })
            .client((key: keyof typeof env) => {
                const value = (import.meta.env as Record<string, string | undefined>)[key];
                return value;
            }),
    };
})();

export default envConfig;
