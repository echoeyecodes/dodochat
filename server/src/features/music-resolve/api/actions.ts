import type { Request, Response, NextFunction } from "express";
import { AppleMusicProvider } from "../services/apple";
import { SpotifyMusicProvider } from "../services/spotify";
import { YoutubeMusicProvider } from "../services/youtube";
import { sendResponse } from "../../common/helpers";
import { HTTP_STATUS_CODES } from "../../common/constants/http-status-codes";

const apple_provider = new AppleMusicProvider();
const spotify_provider = new SpotifyMusicProvider();
const youtube_provider = new YoutubeMusicProvider();

const resolve = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { query, platform } = req.query as unknown as {
            query: string;
            platform: string;
        };
        let result = null;

        switch (platform) {
            case "apple":
                result = await apple_provider.resolveLink(query);
                break;
            case "spotify":
                result = await spotify_provider.resolveLink(query);
                break;
            case "youtube":
                result = await youtube_provider.resolveLink(query);
                break;
            default:
                throw new Error("Invalid platform");
        }
        return sendResponse({ res, status: HTTP_STATUS_CODES.OK })(result);
    } catch (error) {
        return next(error);
    }
};

export const musicResolveActions = {
    resolve,
};
