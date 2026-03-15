import { AuthTokenModel } from "../models/AuthToken";
import type { AuthToken } from "../types/index";

export const createAuthToken = async (data: Partial<AuthToken>) => {
    return await AuthTokenModel.create(data);
};
