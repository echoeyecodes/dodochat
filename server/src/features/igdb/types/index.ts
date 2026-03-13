export type IgdbConfig = {
    client_id: string;
    client_secret: string;
};

export type IgdbTokenResponse = {
    access_token: string;
    expires_in: number;
    token_type: string;
};

export type IgdbQueryOptions = {
    fields?: string[];
    exclude?: string[];
    where?: string;
    search?: string;
    limit?: number;
    offset?: number;
    sort?: string;
};

export type IgdbImage = {
    id: number;
    alpha_channel?: boolean;
    animated?: boolean;
    checksum?: string;
    game?: number;
    height?: number;
    image_id: string;
    url: string;
    width?: number;
};

export type IgdbGame = {
    id: number;
    name: string;
    slug?: string;
    summary?: string;
    storyline?: string;
    first_release_date?: number;
    platforms?: number[];
    genres?: number[];
    themes?: number[];
    cover?: number | IgdbImage;
    screenshots?: number[] | IgdbImage[];
    artworks?: number[] | IgdbImage[];
    videos?: number[];
    websites?: number[];
    involved_companies?: number[];
    similar_games?: number[];
    dlcs?: number[];
    expansions?: number[];
    remakes?: number[];
    remasters?: number[];
    external_games?: number[];
    status?: number;
    category?: number;
    collection?: number;
    rating?: number;
    rating_count?: number;
    total_rating?: number;
    total_rating_count?: number;
    aggregated_rating?: number;
    aggregated_rating_count?: number;
    version_parent?: number;
    version_title?: string;
    checksum?: string;
};

export type IgdbMultiQueryResult = {
    name: string;
    result: Record<string, unknown>[];
};
