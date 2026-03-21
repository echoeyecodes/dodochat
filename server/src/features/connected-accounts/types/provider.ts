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
    getAuthUrl(state: string): string;
    exchangeCode(code: string): Promise<OAuthTokens>;
    getUserProfile(accessToken: string): Promise<ProviderUserProfile>;
};
