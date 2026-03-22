import { ConnectedAccountModel } from "../models/ConnectedAccount";

export const deleteById = async ({
    user_id,
    account_id,
}: {
    user_id: string;
    account_id: string;
}): Promise<void> => {
    await ConnectedAccountModel.deleteOne({ _id: account_id, user_id });
};
