import { createAuthToken } from "./createAuthToken";
import { getAuthToken } from "./getAuthToken";
import { deleteAuthToken } from "./deleteAuthToken";

export const authRepository = {
    createAuthToken,
    getAuthToken,
    deleteAuthToken,
};
