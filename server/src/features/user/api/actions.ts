import type { NextFunction, Response } from 'express';
import type { AuthRequest } from '../../common/types/request';
import { userRepository } from '../repository/index';
import { sendResponse } from '../../common/helpers';
import { HTTP_STATUS_CODES } from '@/features/common/constants/http-status-codes';
import encryption from '@/lib/encryption';
import { USER_GEMINI_TOKEN_SECRET } from '../constants';
import { safeDecryptGeminiKey } from '../helpers/safe-decrypt';

export const getCurrentUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const user = await userRepository.getUserById(req.user_id!);
        const { password: _, ...userWithoutPassword } = user;

        userWithoutPassword.gemini_api_key = userWithoutPassword.gemini_api_key ? safeDecryptGeminiKey(userWithoutPassword.gemini_api_key) : undefined;

        return sendResponse({ res, status: HTTP_STATUS_CODES.OK })(userWithoutPassword)
    } catch (error) {
        return next(error)
    }
};

export const updateCurrentUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { gemini_api_key, settings } = req.body;

        const updates: Record<string, any> = { settings };
        if (gemini_api_key) {
            updates.gemini_api_key = encryption.encrypt({
                seed: USER_GEMINI_TOKEN_SECRET,
                value: gemini_api_key
            });
        }

        const user = await userRepository.updateUser(req.user_id!, updates);
        const { password: _, ...userWithoutPassword } = user as any;

        userWithoutPassword.gemini_api_key = safeDecryptGeminiKey(userWithoutPassword.gemini_api_key);

        return sendResponse({ res, status: HTTP_STATUS_CODES.OK })(userWithoutPassword)
    } catch (error) {
        return next(error)
    }
};
