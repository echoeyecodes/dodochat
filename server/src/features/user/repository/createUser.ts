import { UserModel } from "../models/User";
import { type User } from "../types/index";

export const createUser = async (data: Partial<User>) => {
    const doc = await UserModel.create(data);
    return doc.toObject();
};
