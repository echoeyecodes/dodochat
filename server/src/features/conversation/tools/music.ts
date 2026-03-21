import { tool } from "ai";
import { z } from "zod";
import { MusicBrainzClient } from "@/lib/musicbrainz/musicbrainz-client";
import type { MusicBrainzArtist, MusicBrainzRecording } from "@/lib/musicbrainz/types";
import { getValidAccessToken } from "@/features/connected-accounts/helpers/get-valid-access-token";
import { spotifyClient } from "@/lib/spotify";

const mbClient = new MusicBrainzClient();

export async function* waitForOAuthConnection({
    userId,
    provider,
    authUrl,
}: {
    userId: string;
    provider: "spotify";
    authUrl: string;
}): AsyncGenerator<unknown, string, unknown> {
    try {
        const tokenRes = await getValidAccessToken({ userId, provider });
        return tokenRes.accessToken;
    } catch {
        yield {
            status: "requires_auth",
            authUrl,
            message: `Please connect your ${provider} account.`,
        };

        // Poll for up to 120 times (every 5 seconds) -> 10 minutes total
        for (let i = 0; i < 120; i++) {
            await new Promise((resolve) => setTimeout(resolve, 5000));
            try {
                const tokenRes = await getValidAccessToken({ userId, provider });

                yield {
                    status: "resuming",
                    message: `Account connected! Resuming task...`,
                };

                return tokenRes.accessToken;
            } catch {
                // Ignore and continue polling
            }
        }

        throw new Error(
            `${provider.charAt(0).toUpperCase() + provider.slice(1)} account connection timeout. Please try again later.`,
        );
    }
}

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
            "Fetch a list of specific songs or a random list of songs from MusicBrainz. If you are recommending specific artists and tracks to the user in text, YOU MUST pass those exact tracks using the 'queries' array here to fetch their exact metadata instead of returning random unrelated tracks.",
        inputSchema: z.object({
            queries: z
                .array(z.object({ artist: z.string().optional(), title: z.string() }))
                .optional()
                .describe(
                    "A list of explicit track lookups to perform. Use this to lookup the exact songs you recommended.",
                ),
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
            queries,
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

                if (queries && queries.length > 0) {
                    for (const q of queries) {
                        const recRes = await mbClient.search("recording", {
                            artist: q.artist,
                            title: q.title,
                            limit: 3,
                            official_only,
                        });
                        const recs: MusicBrainzRecording[] = recRes.recordings || [];
                        if (recs.length > 0 && recs[0]) {
                            const r = recs[0];
                            songs.push({
                                title: r.title,
                                artist:
                                    r["artist-credit"]?.[0]?.artist?.name || q.artist || "Unknown",
                                id: r.id,
                                release: r.releases?.[0]?.title,
                                releaseId: r.releases?.[0]?.id,
                                date: r.releases?.[0]?.date,
                                duration: r.length,
                                isrc: r.isrcs?.filter(Boolean)[0],
                            });
                        }
                    }

                    return {
                        songs,
                        message: `Fetched ${songs.length} requested exact song(s) from MusicBrainz`,
                    };
                }

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

export const createPlaylistTool = (userId: string) =>
    tool({
        description:
            "Create a Spotify playlist for the user. Provide a creative name and a list of songs (title, artist, and optional isrc). Call this when the user says 'make a playlist' or similar.",
        inputSchema: z.object({
            name: z
                .string()
                .describe("A creative name for the playlist, based on the theme or songs."),
            songs: z
                .array(
                    z.object({
                        title: z.string(),
                        artist: z.string(),
                        isrc: z.string().optional(),
                    }),
                )
                .describe("The list of songs to add to the playlist."),
        }),
        execute: async function* ({ name, songs }) {
            let accessToken: string;

            try {
                accessToken = yield* waitForOAuthConnection({
                    userId,
                    provider: "spotify",
                    authUrl: "/oauth/spotify/connect",
                });
            } catch (err) {
                yield {
                    success: false,
                    message: (err as Error).message,
                };
                return;
            }

            try {
                const trackUris: string[] = [];
                for (const song of songs) {
                    let trackUri: string | null = null;
                    if (song.isrc) {
                        const searchRes = await spotifyClient.searchTrackByIsrc(song.isrc);
                        if (searchRes.tracks?.items?.length > 0) {
                            trackUri = searchRes.tracks.items[0]!.uri;
                        }
                    }
                    if (!trackUri) {
                        const query = `${song.artist} ${song.title}`;
                        const searchRes = await spotifyClient.searchTrack({ query, limit: 1 });
                        if (searchRes.tracks?.items?.length > 0) {
                            trackUri = searchRes.tracks.items[0]!.uri;
                        }
                    }
                    if (trackUri) trackUris.push(trackUri);
                }

                if (trackUris.length === 0) {
                    yield {
                        success: false,
                        message: "Could not find any of the requested songs on Spotify.",
                    };
                    return;
                }

                const playlist = await spotifyClient.createPlaylist(name, accessToken);
                await spotifyClient.addTracksToPlaylist(playlist.id, trackUris, accessToken);

                const updatedPlaylist = await spotifyClient.getPlaylist(playlist.id, accessToken);

                yield {
                    success: true,
                    id: updatedPlaylist.id,
                    title: updatedPlaylist.name,
                    description: updatedPlaylist.description,
                    thumbnail: updatedPlaylist.images?.[0]?.url,
                    songCount: trackUris.length,
                    url: updatedPlaylist.external_urls.spotify,
                    message: `Successfully created playlist "${updatedPlaylist.name}" with ${trackUris.length} tracks.`,
                };
            } catch (error) {
                console.error("Failed to create playlist:", error);
                yield {
                    success: false,
                    message:
                        (error as Error)?.message ||
                        "Internal server error while creating playlist",
                };
            }
        },
    });
