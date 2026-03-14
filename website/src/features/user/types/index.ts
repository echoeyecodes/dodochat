export type User = {
    id: string;
    email: string;
    display_name: string;
    created_at: string;
    updated_at: string;
    gemini_api_key?: string;
    settings?: {
        should_use_own_gemini_key: boolean;
    };
};
