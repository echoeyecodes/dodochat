import mongoose, { Schema, Document } from "mongoose";
import { CONVERSATION_VISIBILITY } from "../constants";
import type { MessagePart, Message, ConversationVisibility } from "../types/index";

export type ConversationDoc = {
    user_id: string;
    title: string;
    messages: Message[];
    visibility: ConversationVisibility;
    share_token?: string;
    created_at: Date;
    updated_at: Date;
} & Document;

const messagePartSchema = new Schema<MessagePart>(
    {
        type: { type: String, required: true },
        text: { type: String },
    },
    { strict: false, _id: false },
);

const messageSchema = new Schema<Message>(
    {
        id: { type: String, required: true },
        role: { type: String, required: true, enum: ["user", "assistant", "system"] },
        parts: [messagePartSchema],
        created_at: { type: Date, default: Date.now },
    },
    { _id: false },
);

const conversationSchema = new Schema(
    {
        user_id: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
        title: { type: String, default: "New Chat" },
        messages: [messageSchema],
        visibility: {
            type: String,
            enum: Object.values(CONVERSATION_VISIBILITY),
            default: CONVERSATION_VISIBILITY.PRIVATE,
        },
        share_token: { type: String, unique: true, sparse: true, index: true },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    },
);

conversationSchema.index({
    title: "text",
    "messages.parts.text": "text",
});

export const Conversation = mongoose.model<ConversationDoc>("Conversation", conversationSchema);
