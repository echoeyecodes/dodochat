import { AuthTokenModel } from "../models/AuthToken";
import type { AuthToken } from "../types/index";

export const createAuthToken = async (data: Partial<AuthToken>) => {
    const doc = await AuthTokenModel.create(data);
    return doc.toObject();
};
