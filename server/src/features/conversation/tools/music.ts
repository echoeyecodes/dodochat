import { tool } from "ai";
import { z } from "zod";
import { MusicBrainzClient } from "@/lib/musicbrainz/musicbrainz-client";
import type { MusicBrainzArtist, MusicBrainzRecording } from "@/lib/musicbrainz/types";

const mbClient = new MusicBrainzClient();

type Song = {
    title: string;
    artist: string;
    id: string;
    release?: string;
    releaseId?: string;
    date?: string;
    duration?: number;
    isrc?: string;
};

export const musicTools = {
    randomSongs: tool({
        description:
            "Fetch a list of songs from MusicBrainz. You can filter by genre, artist, release year, title, and other MusicBrainz fields. The AI can pass any combination of filters to get a random list.",
        inputSchema: z.object({
            genre: z.string().optional().describe("Genre tag, e.g., 'emo', 'rock'"),
            artist: z.string().optional().describe("Artist name"),
            title: z.string().optional().describe("Song title"),
            release: z.string().optional().describe("Release/album title"),
            country: z.string().optional().describe("Country code of recording"),
            date: z.string().optional().describe("Release date in YYYY or YYYY-MM-DD format"),
            limit: z.number().optional().describe("Number of songs to return (max 50)"),
            official_only: z
                .boolean()
                .optional()
                .describe("Return only official, studio recordings (excludes remixes, live, etc.)"),
        }),
        outputSchema: z.object({
            songs: z.array(
                z.object({
                    title: z.string(),
                    artist: z.string(),
                    id: z.string(),
                    release: z.string().optional(),
                    releaseId: z.string().optional(),
                    date: z.string().optional(),
                    duration: z.number().optional(),
                    isrc: z.string().optional(),
                }),
            ),
            message: z.string(),
        }),
        execute: async ({
            genre,
            artist,
            title,
            release,
            country,
            date,
            limit = 10,
            official_only = true,
        }) => {
            try {
                let songs: Song[] = [];

                // If genre is specified, fetch a pool of artists first to avoid repeats
                if (genre) {
                    const artistRes = await mbClient.search("artist", {
                        tag: genre,
                        limit: 50,
                    });
                    const artists: MusicBrainzArtist[] = artistRes.artists || [];
                    if (artists.length === 0) {
                        return {
                            songs: [],
                            message: `No artists found for genre "${genre}"`,
                        };
                    }

                    // Randomly select artists and fetch recordings for each
                    const selectedArtists = artists
                        .sort(() => 0.5 - Math.random())
                        .slice(0, Math.min(limit, artists.length));
                    for (const a of selectedArtists) {
                        const recRes = await mbClient.search("recording", {
                            artist: a.name,
                            official_only,
                            limit: 5, // fetch a few recordings per artist
                        });
                        const recs: MusicBrainzRecording[] = recRes.recordings || [];
                        songs.push(
                            ...recs.map((r: MusicBrainzRecording) => ({
                                title: r.title,
                                artist: a.name,
                                id: r.id,
                                release: r.releases?.[0]?.title,
                                releaseId: r.releases?.[0]?.id,
                                date: r.releases?.[0]?.date,
                                duration: r.length,
                                isrc: r.isrcs?.filter(Boolean)[0],
                            })),
                        );
                    }
                } else {
                    const recRes = await mbClient.search("recording", {
                        artist,
                        release,
                        title,
                        country,
                        date,
                        official_only,
                        limit: Math.min(limit, 50),
                    });
                    const recs: MusicBrainzRecording[] = recRes.recordings || [];
                    songs.push(
                        ...recs.map((r: MusicBrainzRecording) => ({
                            title: r.title,
                            artist: r["artist-credit"]?.[0]?.artist?.name || artist || "Unknown",
                            id: r.id,
                            release: r.releases?.[0]?.title,
                            releaseId: r.releases?.[0]?.id,
                            date: r.releases?.[0]?.date,
                            duration: r.length,
                            isrc: r.isrcs?.filter(Boolean)[0],
                        })),
                    );
                }

                songs = songs.sort(() => 0.5 - Math.random()).slice(0, limit);

                return {
                    songs,
                    message: `Fetched ${songs.length} random song(s) from MusicBrainz`,
                };
            } catch (err) {
                console.error("MusicBrainz tool failed:", err);
                throw new Error("Failed to fetch songs from MusicBrainz");
            }
        },
    }),
};
