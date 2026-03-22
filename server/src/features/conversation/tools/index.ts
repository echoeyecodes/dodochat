import { igdbTools } from "./igdb";
import { systemTools } from "./system";
import { mediaTools } from "./media";
import { fileTools } from "./files";
import { musicTools, createPlaylistTool } from "./music";

export const getAllTools = (user_id?: string) => ({
    ...igdbTools,
    ...systemTools,
    ...mediaTools,
    ...fileTools,
    ...musicTools,
    ...(user_id ? { createPlaylist: createPlaylistTool(user_id) } : {}),
});
