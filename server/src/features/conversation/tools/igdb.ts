import { tool } from 'ai';
import { z } from 'zod';
import { igdbApi } from '../../igdb';

export const igdbTools = {
    searchGames: tool({
        description: 'Search for video games on IGDB. Returns game metadata. For images, you can construct higher quality URLs by replacing "t_thumb" in the returned URL with "t_720p" or "t_1080p".',
        inputSchema: z.object({
            query: z.string().describe('The name of the game to search for.'),
            limit: z.number().optional().default(5).describe('The number of results to return.'),
        }),
        execute: async ({ query, limit }) => {
            return await igdbApi.getGames({
                search: query,
                limit,
                fields: ['name', 'id', 'summary', 'first_release_date', 'genres.name', 'platforms.name', 'rating', 'cover.url', 'artworks.url']
            });
        },
    }),
    getGameDetails: tool({
        description: 'Get detailed information about a specific video game. IGDB provides image URLs with a "t_thumb" segment; you should replace this with "t_screenshot_huge" or "t_1080p" for high-res images.',
        inputSchema: z.object({
            gameId: z.number().describe('The IGDB ID of the game.'),
        }),
        execute: async ({ gameId }) => {
            return await igdbApi.getGame(gameId, [
                'name', 'summary', 'storyline', 'first_release_date',
                'genres.name', 'platforms.name', 'involved_companies.company.name',
                'rating', 'total_rating', 'cover.url', 'screenshots.url', 'videos.video_id', 'artworks.url'
            ]);
        },
    }),
};
