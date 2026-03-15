import { useMutation } from "@tanstack/react-query";
import { conversationApi } from "../api";
import { useInvalidateConversations } from "./useInvalidateConversations";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const useForkConversation = () => {
    const invalidateConversations = useInvalidateConversations();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: conversationApi.forkConversation,
        onSuccess: (data) => {
            invalidateConversations();
            toast.success("Conversation continued!");
            navigate({ to: "/conversations/$id", params: { id: data._id } });
        },
        onError: (error) => {
            toast.error(error?.message || "Failed to fork conversation");
        },
    });
};
