import { useQuery } from "@tanstack/react-query";
import { conversationApi } from "../api";

type UseSearchConversationsOptions = {
    enabled?: boolean;
    stale_time?: number;
};

export const useSearchConversations = (
    query: string,
    { enabled, stale_time }: UseSearchConversationsOptions = {},
) => {
    return useQuery({
        queryKey: ["conversations", "search", query],
        queryFn: () => conversationApi.searchConversations(query),
        enabled: enabled && query.trim().length > 0,
        staleTime: stale_time,
    });
};
