import { useMutation } from "@tanstack/react-query";
import { conversationApi } from "../api";
import { useInvalidateConversations } from "./useInvalidateConversations";
import { toast } from "sonner";

export const useUpdateConversation = () => {
    const invalidateConversations = useInvalidateConversations();

    return useMutation({
        mutationFn: ({ id, title }: { id: string; title: string }) =>
            conversationApi.updateConversation(id, { title }),
        onSuccess: () => {
            invalidateConversations();
            toast.success("Conversation updated");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to update conversation");
        },
    });
};
