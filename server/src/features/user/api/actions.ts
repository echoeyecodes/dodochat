import type { NextFunction, Response } from 'express';
import type { AuthRequest } from '../../common/types/request';
import { userRepository } from '../repository/index';
import { sendResponse } from '../../common/helpers';
import { HTTP_STATUS_CODES } from '@/features/common/constants/http-status-codes';

export const getCurrentUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const user = await userRepository.getUserById(req.user_id!);
        const { password: _, ...userWithoutPassword } = user;
        return sendResponse({ res, status: HTTP_STATUS_CODES.OK })(userWithoutPassword)
    } catch (error) {
        return next(error)
    }
};

export const updateCurrentUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { gemini_api_key } = req.body;
        const user = await userRepository.updateUser(req.user_id!, { gemini_api_key });
        const { password: _, ...userWithoutPassword } = user;
        return sendResponse({ res, status: HTTP_STATUS_CODES.OK })(userWithoutPassword)
    } catch (error) {
        return next(error)
    }
};
