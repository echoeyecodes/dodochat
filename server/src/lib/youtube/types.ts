export type YoutubeSearchResponse = {
    items: {
        id: {
            video_id: string;
        };
        snippet: {
            title: string;
            description: string;
        };
    }[];
};
