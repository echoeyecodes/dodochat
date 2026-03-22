export type ConnectedAccount = {
    _id: string;
    user_id: string;
    provider: "spotify" | "apple" | "youtube";
    provider_id: string;
    display_name?: string;
    created_at: string;
    updated_at: string;
};
