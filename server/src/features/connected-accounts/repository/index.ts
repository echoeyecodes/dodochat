import { getAccountsForUser } from "./getAccountsForUser";
import { deleteById } from "./deleteById";
import { upsertAccount } from "./upsertAccount";

export const connectedAccountRepository = {
    getAccountsForUser,
    deleteById,
    upsertAccount,
};
