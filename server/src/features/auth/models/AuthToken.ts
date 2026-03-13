import mongoose, { Schema } from 'mongoose';
import type { IAuthToken } from '../types/index';

const AuthTokenSchema = new Schema<IAuthToken>(
    {
        user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        access_token: { type: String, required: true },
        refresh_token: { type: String, required: true },
        access_token_expires_at: { type: Date, required: true },
        ip_address: { type: String },
        device_name: { type: String },
        ip_country: { type: String },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);

export const AuthTokenModel = mongoose.model<IAuthToken>("AuthToken", AuthTokenSchema);
