import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api";
import { updateAuthSession } from "../helpers";

export const useLogin = () => {
    return useMutation({
        mutationFn: authApi.login,
        async onSuccess(data) {
            await updateAuthSession({
                data: {
                    access_token: data.access_token,
                    refresh_token: data.refresh_token,
                },
            });
        },
    });
};
