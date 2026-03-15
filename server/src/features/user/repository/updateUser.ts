import { UserModel } from "../models/User";
import { userNotFoundError } from "../constants/errors";
import { userSettingsCache } from "../helpers/user-settings-cache";

export const updateUser = async (
    id: string,
    updates: { gemini_api_key?: string; settings?: { should_use_own_gemini_key: boolean } },
) => {
    const user = await UserModel.findByIdAndUpdate(id, updates, { new: true }).lean();
    if (!user) throw userNotFoundError();
    userSettingsCache.invalidate(id);
    return user;
};
