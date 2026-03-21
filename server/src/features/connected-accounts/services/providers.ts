import { spotifyClient } from "@/lib/spotify";
import { type OAuthProvider } from "../types/provider";

class SpotifyOAuthProvider implements OAuthProvider {
    getAuthUrl(state: string): string {
        return spotifyClient.getAuthUrl(state);
    }

    async exchangeCode(code: string) {
        const tokens = await spotifyClient.exchangeCode(code);
        return {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expires_at: Date.now() + tokens.expires_in * 1000,
        };
    }

    async getUserProfile(accessToken: string) {
        return await spotifyClient.getUserProfile(accessToken);
    }
}

export const providers: Record<string, OAuthProvider> = {
    spotify: new SpotifyOAuthProvider(),
    // apple: new AppleOAuthProvider(),
    // youtube: new YoutubeOAuthProvider(),
};
