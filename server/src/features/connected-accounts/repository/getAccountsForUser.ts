import { ConnectedAccountModel } from "../models/ConnectedAccount";
import { type ConnectedAccount } from "../types";

export const getAccountsForUser = async (user_id: string): Promise<ConnectedAccount[]> => {
    return await ConnectedAccountModel.find({ user_id }).lean();
};
