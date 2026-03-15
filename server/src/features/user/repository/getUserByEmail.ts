import { UserModel } from "../models/User";
import { userNotFoundError } from "../constants/errors";

export const getUserByEmail = async (email: string) => {
    const user = await UserModel.findOne({ email }).lean();
    if (!user) throw userNotFoundError();
    return user;
};
