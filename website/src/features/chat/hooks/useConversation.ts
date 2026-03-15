import { useQuery } from "@tanstack/react-query";
import { conversationApi } from "../api";
import { conversationKeys } from "../constants/query-keys";

export const useConversation = ({
    id,
    enabled,
    retry,
}: {
    id: string;
    enabled?: boolean;
    retry?: number;
}) => {
    return useQuery({
        queryKey: conversationKeys.detail(id!),
        queryFn: () => conversationApi.fetchConversationById(id),
        enabled,
        retry,
    });
};
