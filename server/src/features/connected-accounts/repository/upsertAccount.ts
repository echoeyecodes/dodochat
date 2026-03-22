import { ConnectedAccountModel } from "../models/ConnectedAccount";
import { type ConnectedAccount } from "../types";

export const upsertAccount = async (
    data: Omit<ConnectedAccount, "_id" | "created_at" | "updated_at">,
): Promise<ConnectedAccount> => {
    const { user_id, provider, ...updates } = data;
    const account = await ConnectedAccountModel.findOneAndUpdate(
        { user_id, provider },
        { ...updates },
        { upsert: true, new: true, lean: true },
    );
    return account as ConnectedAccount;
};
