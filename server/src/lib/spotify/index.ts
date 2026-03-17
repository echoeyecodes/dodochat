import request from "@/lib/request";
import envConfig from "@/lib/env";
import { type SpotifySearchResponse, type SpotifyTokenResponse } from "./types";

export class SpotifyClient {
    private client_id: string;
    private client_secret: string;
    private access_token: string | null = null;
    private token_expiry: number = 0;

    constructor() {
        this.client_id = envConfig.get("SPOTIFY_CLIENT_ID")!;
        this.client_secret = envConfig.get("SPOTIFY_CLIENT_SECRET")!;

        if (!this.client_id || !this.client_secret) {
            throw new Error("SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET is not defined");
        }
    }

    private get_access_token = async (): Promise<string> => {
        if (this.access_token && Date.now() < this.token_expiry) {
            return this.access_token;
        }

        const auth = Buffer.from(`${this.client_id}:${this.client_secret}`).toString("base64");

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
        this.access_token = token_data.access_token;
        this.token_expiry = Date.now() + (token_data.expires_in - 60) * 1000;

        return this.access_token;
    };

    search_track = async ({
        query,
        limit = 1,
    }: {
        query: string;
        limit?: number;
    }): Promise<SpotifySearchResponse> => {
        const token = await this.get_access_token();

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
}

export const spotifyClient = new SpotifyClient();
