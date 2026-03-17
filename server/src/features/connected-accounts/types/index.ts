import mongoose from "mongoose";

export type ConnectedAccount = {
    _id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
    provider: "spotify" | "apple" | "youtube";
    provider_id: string;
    display_name?: string;
    access_token: string;
    refresh_token?: string;
    expires_at?: number;
    created_at: Date;
    updated_at: Date;
};
