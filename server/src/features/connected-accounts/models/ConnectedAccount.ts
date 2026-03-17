import mongoose, { Schema } from "mongoose";
import { type ConnectedAccount } from "../types";

const connectedAccountSchema = new Schema<ConnectedAccount>(
    {
        user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
        provider: { type: String, enum: ["spotify", "apple", "youtube"], required: true },
        provider_id: { type: String, required: true },
        display_name: { type: String },
        access_token: { type: String, required: true },
        refresh_token: { type: String },
        expires_at: { type: Number },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    },
);

// Unique index for (user, provider)
connectedAccountSchema.index({ user_id: 1, provider: 1 }, { unique: true });

export const ConnectedAccountModel = mongoose.model<ConnectedAccount>(
    "ConnectedAccount",
    connectedAccountSchema,
);
