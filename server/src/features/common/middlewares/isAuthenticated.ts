import type { Response, NextFunction } from 'express';
import type { AuthRequest } from '../types/request';
import { notAuthenticatedError } from '../constants/errors';
import { UserModel } from '../../user/models/User';

const isAuthenticated = async (
    req: AuthRequest,
    _: Response,
    next: NextFunction
) => {
    const userId = req.user_id;
    if (!userId) return next(notAuthenticatedError());

    const user = await UserModel.findById(userId, { _id: 1 });
    if (!user) return next(notAuthenticatedError());

    req.user_id = userId;
    next();
};

export default isAuthenticated;
