import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api";

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: userApi.updateProfile,
        onSuccess: (updatedUser) => {
            queryClient.setQueryData(["currentUser"], updatedUser);
        },
    });
};
