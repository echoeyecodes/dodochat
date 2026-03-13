export type AuthToken = {
    user_id: string;
    access_token: string;
    refresh_token: string;
    access_token_expires_at: Date;
    ip_address?: string;
    device_name?: string;
    ip_country?: string;
    created_at: Date;
    updated_at: Date;
};
