import request from "@/lib/request";
import { BaseMusicProvider, type MusicResolveResult } from "./provider";
import { mediaResourceNotFound } from "../constants/errors";

export class AppleMusicProvider extends BaseMusicProvider {
    async resolveLink(query: string): Promise<MusicResolveResult> {
        try {
            const { data } = await request({
                base: "https://itunes.apple.com",
                path: "search",
                method: "GET",
                query: {
                    term: query,
                    entity: "song",
                    limit: 1,
                },
            });

            // iTunes API sometimes returns raw text if the content-type isn't set to application/json
            const parsedData = typeof data === "string" ? JSON.parse(data.trim()) : data;
            const results = (parsedData as { results?: { trackViewUrl?: string }[] }).results || [];
            if (results.length === 0 || !results[0]?.trackViewUrl) throw mediaResourceNotFound();

            return {
                link: results[0].trackViewUrl,
                platform: "apple",
            };
        } catch (error) {
            console.error("Apple Music resolve failed:", error);
            throw error;
        }
    }
}
