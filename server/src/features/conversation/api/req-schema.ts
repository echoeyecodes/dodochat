import { z } from "zod";

export const GetConversationSchema = z.object({
    params: z.object({
        id: z.string().min(1, "Conversation ID is required"),
    }),
});

export const DeleteConversationSchema = z.object({
    params: z.object({
        id: z.string().min(1, "Conversation ID is required"),
    }),
});

export const UpdateConversationSchema = z.object({
    params: z.object({
        id: z.string().min(1, "Conversation ID is required"),
    }),
    body: z
        .object({
            title: z.string().min(1, "Title is required").max(100, "Title is too long").optional(),
        })
        .refine((data) => Object.keys(data).length > 0, {
            message: "At least one field must be provided for update",
        }),
});

export const SearchConversationsSchema = z.object({
    query: z.object({
        q: z.string().min(1, "Search query is required"),
    }),
});

import { CONVERSATION_VISIBILITY } from "../constants";

export const ShareConversationSchema = z.object({
    params: z.object({
        id: z.string().min(1, "Conversation ID is required"),
    }),
    body: z.object({
        visibility: z.enum([CONVERSATION_VISIBILITY.PRIVATE, CONVERSATION_VISIBILITY.PUBLIC]),
    }),
});

export const GetSharedConversationSchema = z.object({
    params: z.object({
        token: z.string().min(1, "Share token is required"),
    }),
});

export const ForkConversationSchema = z.object({
    params: z.object({
        token: z.string().min(1, "Share token is required"),
    }),
});

export const ChatSchema = z.object({
    body: z.object({
        messages: z
            .array(
                z
                    .object({
                        id: z.string(),
                        role: z.enum(["user", "assistant", "system"]),
                        parts: z.array(
                            z
                                .object({
                                    type: z.string(),
                                    text: z.string().optional(),
                                    file: z
                                        .object({
                                            name: z.string(),
                                            url: z.string(),
                                            id: z.string(),
                                        })
                                        .optional(),
                                })
                                .passthrough(),
                        ),
                    })
                    .passthrough(),
            )
            .min(1, "At least one message is required"),
        conversationId: z.string().optional(),
    }),
});

export type GetConversationInput = z.infer<typeof GetConversationSchema>["params"];
export type UpdateConversationInput = z.infer<typeof UpdateConversationSchema>["body"];
export type ChatInput = z.infer<typeof ChatSchema>["body"];
