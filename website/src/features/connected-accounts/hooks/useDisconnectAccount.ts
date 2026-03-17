import { useMutation, useQueryClient } from "@tanstack/react-query";
import { connectedAccountsApi } from "../api";
import { toast } from "sonner";
import { CONNECTED_ACCOUNT_KEYS } from "./useConnectedAccounts";

export const useDisconnectAccount = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: connectedAccountsApi.disconnectAccount,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CONNECTED_ACCOUNT_KEYS.all });
            toast.success(`Account disconnected successfully`);
        },
        onError: (err) => {
            toast.error(err instanceof Error ? err.message : "Disconnect failed");
        },
    });
};
