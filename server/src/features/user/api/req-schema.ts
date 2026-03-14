import { z } from 'zod';

export const UpdateProfileSchema = z.object({
    body: z.object({
        gemini_api_key: z.string().optional(),
        settings: z.object({
            should_use_own_gemini_key: z.boolean(),
        }).optional(),
    }),
});

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>['body'];
