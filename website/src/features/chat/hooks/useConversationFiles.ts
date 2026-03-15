import { useQuery } from "@tanstack/react-query";
import { conversationApi } from "../api";

type UseConversationFilesOptions = {
    id?: string;
    enabled?: boolean;
};

export const useConversationFiles = ({ id, enabled }: UseConversationFilesOptions) => {
    return useQuery({
        queryKey: ["conversations", id, "files"],
        queryFn: () => conversationApi.fetchConversationFiles(id!),
        enabled,
    });
};
