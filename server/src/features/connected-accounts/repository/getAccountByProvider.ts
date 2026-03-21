import { ConnectedAccountModel } from "../models/ConnectedAccount";
import { type ConnectedAccount } from "../types";

export const getAccountByProvider = async (
    user_id: string,
    provider: string,
): Promise<ConnectedAccount | null> => {
    return await ConnectedAccountModel.findOne({ user_id, provider }).lean();
};
