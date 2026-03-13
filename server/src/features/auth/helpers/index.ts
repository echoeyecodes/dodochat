import crypto from 'crypto';
import { AUTH_TOKEN_SECRET } from '../constants';

export const hashToken = (token: string): string => {
    return crypto
        .createHmac("sha256", AUTH_TOKEN_SECRET)
        .update(token)
        .digest("hex");
};
