import { useQuery } from "@tanstack/react-query";
import { connectedAccountsApi } from "../api";

export const CONNECTED_ACCOUNT_KEYS = {
    all: ["connected-accounts"] as const,
};

type UseConnectedAccountsOptions = {
    enabled?: boolean;
    stale_time?: number;
};

export const useConnectedAccounts = (options: UseConnectedAccountsOptions = {}) => {
    return useQuery({
        queryKey: CONNECTED_ACCOUNT_KEYS.all,
        queryFn: connectedAccountsApi.fetchMyAccounts,
        enabled: options.enabled,
        staleTime: options.stale_time,
    });
};
