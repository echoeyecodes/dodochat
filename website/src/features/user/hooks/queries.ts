import { queryOptions } from "@tanstack/react-query";
import { userApi } from "@/features/user/api";

export const currentUserQueryOptions = () => {
    const data = queryOptions({
        queryKey: ["currentUser"],
        queryFn: userApi.fetchCurrentUser,
        retry: false,
        staleTime: Infinity,
    });

    return data;
};
