import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api";

export const useLogin = () => {
    return useMutation({
        mutationFn: authApi.login,
    });
};
