import { z } from "zod";

export const resolveMusicQuerySchema = z.object({
    query: z.object({
        query: z.string().min(1, "Query is required"),
        platform: z.enum(["apple", "spotify", "youtube"]).default("apple"),
    }),
});

export type ResolveMusicQueryInput = z.infer<typeof resolveMusicQuerySchema>["query"];
