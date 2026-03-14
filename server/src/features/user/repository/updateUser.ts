import { UserModel } from '../models/User';
import { userNotFoundError } from '../constants/errors';
import { userSettingsService } from '../services/userSettingsService';

export const updateUser = async (id: string, updates: { gemini_api_key?: string, settings?: { should_use_own_gemini_key: boolean } }) => {
    const user = await UserModel.findByIdAndUpdate(id, updates, { new: true }).lean();
    if (!user) throw userNotFoundError();
    userSettingsService.invalidate(id);
    return user;
};
