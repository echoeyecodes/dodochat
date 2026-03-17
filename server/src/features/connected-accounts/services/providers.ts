import { spotifyClient } from "@/lib/spotify";
import { type OAuthProvider } from "../types/provider";

class SpotifyOAuthProvider implements OAuthProvider {
    get_auth_url(state: string): string {
        return spotifyClient.get_auth_url(state);
    }

    async exchange_code(code: string) {
        const tokens = await spotifyClient.exchange_code(code);
        return {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expires_at: Date.now() + tokens.expires_in * 1000,
        };
    }

    async get_user_profile(access_token: string) {
        return await spotifyClient.get_user_profile(access_token);
    }
}

export const providers: Record<string, OAuthProvider> = {
    spotify: new SpotifyOAuthProvider(),
    // apple: new AppleOAuthProvider(),
    // youtube: new YoutubeOAuthProvider(),
};
