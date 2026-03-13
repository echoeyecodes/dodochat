import { z } from 'zod';

export const UpdateProfileSchema = z.object({
    body: z.object({
        gemini_api_key: z.string().optional(),
    }),
});

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>['body'];
