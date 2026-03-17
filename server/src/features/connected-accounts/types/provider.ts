import type { SpotifyTokenResponse } from "@/lib/spotify/types";

export type OAuthTokens = {
    access_token: string;
    refresh_token?: string;
    expires_at?: number;
};

export type ProviderUserProfile = {
    id: string;
    display_name?: string;
};

export type OAuthProvider = {
    get_auth_url(state: string): string;
    exchange_code(code: string): Promise<OAuthTokens>;
    get_user_profile(access_token: string): Promise<ProviderUserProfile>;
};
