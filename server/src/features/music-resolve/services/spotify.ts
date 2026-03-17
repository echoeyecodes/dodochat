import { mediaResourceNotFound } from "../constants/errors";
import { BaseMusicProvider, type MusicResolveResult } from "./provider";
import { spotifyClient } from "@/lib/spotify";

export class SpotifyMusicProvider extends BaseMusicProvider {
    async resolveLink(query: string): Promise<MusicResolveResult> {
        try {
            const data = await spotifyClient.search_track({ query, limit: 1 });
            const items = data.tracks?.items || [];

            if (items.length === 0 || !items[0]?.external_urls?.spotify) {
                throw mediaResourceNotFound();
            }

            return {
                link: items[0].external_urls.spotify,
                platform: "spotify",
            };
        } catch (error) {
            console.error("Spotify resolve failed:", error);
            throw error;
        }
    }
}
