import { UserModel } from "../models/User";
import { type User } from "../types/index";

export const createUser = async (data: Partial<User>) => {
    return await UserModel.create(data);
};
