import { UserModel } from "../models/User";
import { userNotFoundError } from "../constants/errors";

export const getUserById = async (id: string) => {
    const user = await UserModel.findById(id).lean();
    if (!user) throw userNotFoundError();
    return user;
};
