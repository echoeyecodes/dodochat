export type SpotifyTokenResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
};

export type SpotifyTrack = {
    id: string;
    name: string;
    external_urls: {
        spotify: string;
    };
    artists: {
        name: string;
    }[];
    album: {
        name: string;
        images: {
            url: string;
            height: number;
            width: number;
        }[];
    };
};

export type SpotifySearchResponse = {
    tracks: {
        items: SpotifyTrack[];
        total: number;
    };
};
