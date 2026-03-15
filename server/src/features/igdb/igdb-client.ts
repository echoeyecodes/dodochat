import request from "../../lib/request/index";
import type {
    IgdbConfig,
    IgdbTokenResponse,
    IgdbQueryOptions,
    IgdbGame,
    IgdbImage,
    IgdbMultiQueryResult,
} from "./types/index";

export class IgdbClient {
    private client_id: string;
    private client_secret: string;
    private access_token: string | null = null;
    private token_expiry: number = 0;
    private api_base = "https://api.igdb.com/v4";
    private auth_base = "https://id.twitch.tv";

    constructor(config: IgdbConfig) {
        this.client_id = config.client_id;
        this.client_secret = config.client_secret;
    }

    private async getAccessToken(): Promise<string> {
        const now = Math.floor(Date.now() / 1000);

        if (this.access_token && now < this.token_expiry) {
            return this.access_token;
        }

        const { data } = await request({
            base: this.auth_base,
            path: "oauth2/token",
            method: "POST",
            query: {
                client_id: this.client_id,
                client_secret: this.client_secret,
                grant_type: "client_credentials",
            },
            exclude_trailing_slash: true,
        });

        const token_response = data as IgdbTokenResponse;
        this.access_token = token_response.access_token;
        this.token_expiry = now + token_response.expires_in - 60;

        return this.access_token;
    }

    private buildQuery(options: IgdbQueryOptions): string {
        const lines: string[] = [];

        if (options.search) {
            lines.push(`search "${options.search.replace(/"/g, '\\"')}";`);
        }

        if (options.fields && options.fields.length > 0) {
            lines.push(`fields ${options.fields.join(", ")};`);
        } else if (!options.search) {
            lines.push("fields *;");
        }

        if (options.exclude && options.exclude.length > 0) {
            lines.push(`exclude ${options.exclude.join(", ")};`);
        }

        if (options.where) {
            lines.push(`where ${options.where};`);
        }

        if (options.sort) {
            lines.push(`sort ${options.sort};`);
        }

        if (options.limit !== undefined) {
            lines.push(`limit ${options.limit};`);
        }

        if (options.offset !== undefined) {
            lines.push(`offset ${options.offset};`);
        }

        return lines.join("\n");
    }

    private async callApi<T>(endpoint: string, options: IgdbQueryOptions): Promise<T[]> {
        const token = await this.getAccessToken();
        const query = this.buildQuery(options);

        const { data } = await request({
            base: this.api_base,
            path: endpoint,
            method: "POST",
            headers: {
                "Client-ID": this.client_id,
                Authorization: `Bearer ${token}`,
                "Content-Type": "text/plain",
            },
            body: query,
        });

        return data as T[];
    }

    async getGames(options: IgdbQueryOptions = {}): Promise<IgdbGame[]> {
        return this.callApi<IgdbGame>("games", options);
    }

    async getGame(id: number, fields: string[] = ["*"]): Promise<IgdbGame | null> {
        const games = await this.getGames({
            fields,
            where: `id = ${id}`,
            limit: 1,
        });
        return games.length > 0 ? games[0]! : null;
    }

    async getPlatforms(options: IgdbQueryOptions = {}): Promise<Record<string, unknown>[]> {
        return this.callApi<Record<string, unknown>>("platforms", options);
    }

    async getGenres(options: IgdbQueryOptions = {}): Promise<Record<string, unknown>[]> {
        return this.callApi<Record<string, unknown>>("genres", options);
    }

    async getCovers(options: IgdbQueryOptions = {}): Promise<IgdbImage[]> {
        return this.callApi<IgdbImage>("covers", options);
    }

    async getArtworks(options: IgdbQueryOptions = {}): Promise<IgdbImage[]> {
        return this.callApi<IgdbImage>("artworks", options);
    }

    async getScreenshots(options: IgdbQueryOptions = {}): Promise<IgdbImage[]> {
        return this.callApi<IgdbImage>("screenshots", options);
    }

    async multi(query: string): Promise<IgdbMultiQueryResult[]> {
        const token = await this.getAccessToken();
        const { data } = await request({
            base: this.api_base,
            path: "multiquery",
            method: "POST",
            headers: {
                "Client-ID": this.client_id,
                Authorization: `Bearer ${token}`,
                "Content-Type": "text/plain",
            },
            body: query,
        });
        return data as IgdbMultiQueryResult[];
    }
}
