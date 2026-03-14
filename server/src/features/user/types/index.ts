export type User = {
    _id: string;
    email: string;
    password?: string;
    display_name: string;
    avatar_url?: string;
    created_at: Date;
    updated_at: Date;
    gemini_api_key?: string;
    settings?: {
        should_use_own_gemini_key: boolean;
    };
};
