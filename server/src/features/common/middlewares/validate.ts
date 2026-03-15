import type { Request, Response, NextFunction } from "express";
import { ZodError, type ZodSchema } from "zod";

export const validate =
    (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            }) as {
                body?: unknown;
                query?: Record<string, unknown>;
                params?: Record<string, string>;
            };

            if (parsed.body !== undefined) req.body = parsed.body;
            if (parsed.query !== undefined) {
                const query = req.query as Record<string, unknown>;
                Object.keys(query).forEach((k) => delete query[k]);
                Object.assign(query, parsed.query);
            }
            if (parsed.params !== undefined) {
                const params = req.params as Record<string, string>;
                Object.keys(params).forEach((k) => delete params[k]);
                Object.assign(params, parsed.params);
            }
            return next();
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                const message = error.issues.map((e) => e.message).join(", ");
                return res.status(400).json({ error: message });
            }
            return next(error);
        }
    };
