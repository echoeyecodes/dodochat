import request from "@/lib/request";
import envConfig from "@/lib/env";
import { type YoutubeSearchResponse } from "./types";

export class YoutubeClient {
    private api_key: string;

    constructor() {
        this.api_key = envConfig.get("YOUTUBE_API_KEY") || "";

        if (!this.api_key) {
            console.warn("YOUTUBE_API_KEY missing in environment variables.");
        }
    }

    search_video = async ({
        query,
        limit = 1,
    }: {
        query: string;
        limit?: number;
    }): Promise<YoutubeSearchResponse> => {
        const { data } = await request({
            base: "https://www.googleapis.com",
            path: "/youtube/v3/search",
            method: "GET",
            query: {
                q: query,
                part: "snippet",
                type: "video",
                maxResults: limit,
                key: this.api_key,
            },
        });

        const raw_data = data as {
            items: { id: { videoId: string }; snippet: { title: string; description: string } }[];
        };
        const items = raw_data.items || [];

        // Map camelCase from YouTube API to snake_case as per project conventions
        return {
            items: items.map((item) => ({
                id: {
                    video_id: item.id.videoId,
                },
                snippet: {
                    title: item.snippet.title,
                    description: item.snippet.description,
                },
            })),
        };
    };
}

export const youtubeClient = new YoutubeClient();
