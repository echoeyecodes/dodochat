import { UserModel } from '../models/User';
import { userNotFoundError } from '../constants/errors';

export const updateUser = async (id: string, updates: { gemini_api_key?: string }) => {
    const user = await UserModel.findByIdAndUpdate(id, updates, { new: true }).lean();
    if (!user) throw userNotFoundError();
    return user;
};
