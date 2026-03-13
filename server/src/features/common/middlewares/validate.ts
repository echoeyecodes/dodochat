import type { Request, Response, NextFunction } from 'express';
import { ZodError, type ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed: any = schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        if (parsed.body !== undefined) req.body = parsed.body;
        if (parsed.query !== undefined) {
            Object.keys(req.query).forEach(k => delete req.query[k]);
            Object.assign(req.query, parsed.query);
        }
        if (parsed.params !== undefined) {
            Object.keys(req.params).forEach(k => delete req.params[k]);
            Object.assign(req.params, parsed.params);
        }
        return next();
    } catch (error: any) {
        if (error instanceof ZodError) {
            const message = error.issues.map((e: any) => e.message).join(', ');
            return res.status(400).json({ error: message });
        }
        return next(error);
    }
};
