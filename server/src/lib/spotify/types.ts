export type SpotifyTokenResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token?: string;
};

export type SpotifyUserProfile = {
    id: string;
    display_name: string;
    images?: {
        url: string;
    }[];
};

export type SpotifyTrack = {
    id: string;
    name: string;
    uri: string;
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

export type SpotifyPlaylist = {
    id: string;
    name: string;
    description: string;
    external_urls: {
        spotify: string;
    };
    uri: string;
    images: {
        url: string;
        height: number;
        width: number;
    }[];
    tracks: {
        total: number;
    };
};
