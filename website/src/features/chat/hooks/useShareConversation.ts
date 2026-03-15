import { useMutation } from "@tanstack/react-query";
import { conversationApi } from "../api";
import { useInvalidateConversations } from "./useInvalidateConversations";
import { toast } from "sonner";

export const useShareConversation = () => {
    const invalidateConversations = useInvalidateConversations();

    return useMutation({
        mutationFn: conversationApi.toggleConversationSharing,
        onSuccess: (data) => {
            invalidateConversations();
            toast.success(data.visibility === "public" ? "Sharing enabled" : "Sharing disabled");
        },
        onError: (error) => {
            toast.error(error?.message || "Failed to update sharing settings");
        },
    });
};
