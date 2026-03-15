import mongoose, { Schema } from "mongoose";
import { type User } from "../types/index";

const userSchema = new Schema<User>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String },
        display_name: { type: String, required: true },
        avatar_url: { type: String },
        gemini_api_key: { type: String },
        settings: {
            should_use_own_gemini_key: { type: Boolean, default: false },
        },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    },
);

export const UserModel = mongoose.model<User>("User", userSchema);
