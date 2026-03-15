import { AuthTokenModel } from "../models/AuthToken";
import { authCache } from "../helpers/auth-cache";

export const deleteAuthToken = async (access_token: string) => {
    authCache.invalidate(access_token);
    return await AuthTokenModel.deleteOne({ access_token });
};
