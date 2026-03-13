import { z } from 'zod';

export const LoginSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email address').optional(),
        password: z.string().min(6, 'Password must be at least 6 characters').optional(),
        firebase_token: z.string().optional(),
    }).refine((data) => (data.email && data.password) || data.firebase_token, {
        message: "Either email and password or firebase_token must be provided",
        path: ["firebase_token"],
    }),
});

export type LoginInput = z.infer<typeof LoginSchema>['body'];
