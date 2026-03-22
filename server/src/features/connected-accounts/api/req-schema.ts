import { z } from "zod";

export const ConnectOAuthSchema = z.object({
    params: z.object({
        provider: z.enum(["spotify", "apple", "youtube"]),
    }),
    query: z
        .object({
            redirect_to: z.string().optional(),
        })
        .optional(),
});

export const OAuthCallbackSchema = z.object({
    params: z.object({
        provider: z.enum(["spotify", "apple", "youtube"]),
    }),
    query: z.object({
        code: z.string(),
        state: z.string(),
    }),
});

export const DisconnectAccountSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});
