import { getAccountsForUser } from "./getAccountsForUser";
import { deleteById } from "./deleteById";
import { upsertAccount } from "./upsertAccount";
import { getAccountByProvider } from "./getAccountByProvider";

export const connectedAccountRepository = {
    getAccountsForUser,
    getAccountByProvider,
    deleteById,
    upsertAccount,
};
