import { useMutation, useQueryClient } from "@tanstack/react-query";
import mediaApi from "../api/index";
import { toast } from "sonner";

export const useUploadFile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ file, conversation_id }: { file: File; conversation_id: string }) =>
            mediaApi.uploadFile(file, conversation_id),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["files", variables.conversation_id] });
            toast.success("File uploaded successfully");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to upload file");
        },
    });
};
