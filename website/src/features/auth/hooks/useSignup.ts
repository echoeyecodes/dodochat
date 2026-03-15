import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api";

export const useSignup = () => {
    return useMutation({
        mutationFn: authApi.signup,
    });
};
