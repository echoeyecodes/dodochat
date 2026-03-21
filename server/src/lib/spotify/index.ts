import request from "@/lib/request";
import envConfig from "@/lib/env";
import {
    type SpotifyPlaylist,
    type SpotifySearchResponse,
    type SpotifyTokenResponse,
    type SpotifyUserProfile,
} from "./types";

export class SpotifyClient {
    private clientId: string;
    private clientSecret: string;
    private accessToken: string | null = null;
    private tokenExpiry: number = 0;

    private redirectUri: string;

    constructor() {
        this.clientId = envConfig.get("SPOTIFY_CLIENT_ID")!;
        this.clientSecret = envConfig.get("SPOTIFY_CLIENT_SECRET")!;
        this.redirectUri = envConfig.get("SPOTIFY_REDIRECT_URI")!;

        if (!this.clientId || !this.clientSecret || !this.redirectUri) {
            throw new Error(
                "SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, or SPOTIFY_REDIRECT_URI is not defined",
            );
        }
    }

    getAuthUrl = (state: string): string => {
        const params = new URLSearchParams({
            client_id: this.clientId,
            response_type: "code",
            redirect_uri: this.redirectUri,
            state,
            scope: "user-read-private user-read-email playlist-modify-public playlist-modify-private",
        });
        return `https://accounts.spotify.com/authorize?${params.toString()}`;
    };

    exchangeCode = async (code: string): Promise<SpotifyTokenResponse> => {
        const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64");
        const params = new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: this.redirectUri,
        });

        const { data } = await request({
            base: "https://accounts.spotify.com",
            path: "/api/token",
            method: "POST",
            headers: {
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params,
        });

        return data as SpotifyTokenResponse;
    };

    refreshUserToken = async (refreshToken: string): Promise<SpotifyTokenResponse> => {
        const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64");
        const params = new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        });

        const { data } = await request({
            base: "https://accounts.spotify.com",
            path: "/api/token",
            method: "POST",
            headers: {
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params,
        });

        return data as SpotifyTokenResponse;
    };

    getUserProfile = async (accessToken: string): Promise<SpotifyUserProfile> => {
        const { data } = await request({
            base: "https://api.spotify.com",
            path: "/v1/me",
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return data as SpotifyUserProfile;
    };

    private getAccessToken = async (): Promise<string> => {
        if (this.accessToken && Date.now() < this.tokenExpiry) {
            return this.accessToken;
        }

        const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64");

        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");

        const { data } = await request({
            base: "https://accounts.spotify.com",
            path: "/api/token",
            method: "POST",
            headers: {
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params,
        });

        const token_data = data as SpotifyTokenResponse;
        this.accessToken = token_data.access_token;
        this.tokenExpiry = Date.now() + (token_data.expires_in - 60) * 1000;

        return this.accessToken;
    };

    searchTrack = async ({
        query,
        limit = 1,
    }: {
        query: string;
        limit?: number;
    }): Promise<SpotifySearchResponse> => {
        const token = await this.getAccessToken();

        const { data } = await request({
            base: "https://api.spotify.com",
            path: "/v1/search",
            method: "GET",
            query: {
                q: query,
                type: "track",
                limit: limit,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return data as SpotifySearchResponse;
    };

    searchTrackByIsrc = async (isrc: string): Promise<SpotifySearchResponse> => {
        const token = await this.getAccessToken();

        const { data } = await request({
            base: "https://api.spotify.com",
            path: "/v1/search",
            method: "GET",
            query: {
                q: `isrc:${isrc}`,
                type: "track",
                limit: 1,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return data as SpotifySearchResponse;
    };

    createPlaylist = async (name: string, accessToken: string): Promise<SpotifyPlaylist> => {
        const { data } = await request({
            base: "https://api.spotify.com",
            path: `/v1/me/playlists`,
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: {
                name,
                description: "Created via Dodo Chat",
                public: false,
            },
        });

        return data as SpotifyPlaylist;
    };

    addTracksToPlaylist = async (
        playlistId: string,
        trackUris: string[],
        accessToken: string,
    ): Promise<void> => {
        await request({
            base: "https://api.spotify.com",
            path: `/v1/playlists/${playlistId}/items`,
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: {
                uris: trackUris,
            },
        });
    };

    getPlaylist = async (playlistId: string, accessToken: string): Promise<SpotifyPlaylist> => {
        const { data } = await request({
            base: "https://api.spotify.com",
            path: `/v1/playlists/${playlistId}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return data as SpotifyPlaylist;
    };
}

export const spotifyClient = new SpotifyClient();
