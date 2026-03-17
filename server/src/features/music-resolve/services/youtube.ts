import { mediaResourceNotFound } from "../constants/errors";
import { BaseMusicProvider, type MusicResolveResult } from "./provider";
import { youtubeClient } from "@/lib/youtube";

export class YoutubeMusicProvider extends BaseMusicProvider {
    async resolveLink(query: string): Promise<MusicResolveResult> {
        try {
            const data = await youtubeClient.search_video({ query, limit: 1 });
            const items = data.items || [];

            if (items.length === 0 || !items[0]?.id?.video_id) {
                throw mediaResourceNotFound();
            }

            return {
                link: `https://music.youtube.com/watch?v=${items[0].id.video_id}`,
                platform: "youtube",
            };
        } catch (error) {
            console.error("YouTube resolve failed:", error);
            throw error;
        }
    }
}
