import { request } from "@/lib/request";
import { type ConnectedAccount } from "../types";

export const connectedAccountsApi = {
    fetchMyAccounts: async (): Promise<ConnectedAccount[]> => {
        const { data } = await request({
            path: "api/connected-accounts",
            method: "GET",
        });
        return (data as { data: ConnectedAccount[] }).data;
    },

    disconnectAccount: async (id: string): Promise<void> => {
        await request({
            path: `api/connected-accounts/${id}`,
            method: "DELETE",
        });
    },

    handleCallback: async ({
        provider,
        code,
        state,
    }: {
        provider: string;
        code: string;
        state: string;
    }): Promise<{ success: boolean; redirect_url: string }> => {
        const { data } = await request({
            path: `api/connected-accounts/${provider}/callback`,
            method: "GET",
            query: { code, state },
        });
        return (data as { data: { success: boolean; redirect_url: string } }).data;
    },

    fetchConnectUrl: async (provider: string): Promise<string> => {
        const { data } = await request({
            path: `api/connected-accounts/${provider}/connect`,
            method: "GET",
        });
        return (data as { data: { auth_url: string } }).data.auth_url;
    },
};
