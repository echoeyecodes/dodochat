export type MusicBrainzLifeSpan = {
    begin: string | null;
    end: string | null;
    ended: boolean | null;
};

export type MusicBrainzAlias = {
    "sort-name": string;
    name: string;
    locale: string | null;
    type: string | null;
    primary: boolean | null;
    "begin-date": string | null;
    "end-date": string | null;
};

export type MusicBrainzTag = {
    count: number;
    name: string;
};

export type MusicBrainzArea = {
    id: string;
    name: string;
    "sort-name": string;
    "iso-3166-1-codes"?: string[];
};

export type MusicBrainzSearchResponse<T> = {
    created: string;
    count: number;
    offset: number;
} & T;

export type MusicBrainzArtist = {
    id: string;
    type?: string;
    score: string;
    name: string;
    "sort-name": string;
    country?: string;
    area?: MusicBrainzArea;
    "begin-area"?: MusicBrainzArea;
    "end-area"?: MusicBrainzArea;
    disambiguation?: string;
    "life-span"?: MusicBrainzLifeSpan;
    aliases?: MusicBrainzAlias[];
    tags?: MusicBrainzTag[];
    gender?: string;
    ipis?: string[];
    isnis?: string[];
};

export type MusicBrainzArtistSearchResponse = MusicBrainzSearchResponse<{
    artists: MusicBrainzArtist[];
}>;

export type MusicBrainzArtistCredit = {
    name?: string;
    joinphrase?: string;
    artist: {
        id: string;
        name: string;
        "sort-name": string;
        disambiguation?: string;
        aliases?: MusicBrainzAlias[];
    };
};

export type MusicBrainzTrack = {
    id: string;
    number: string;
    title: string;
    length?: number;
};

export type MusicBrainzMedia = {
    position: number;
    format?: string;
    track?: MusicBrainzTrack[];
    "track-count": number;
    "track-offset"?: number;
};

export type MusicBrainzReleaseGroup = {
    id: string;
    "primary-type"?: string;
    "secondary-types"?: string[];
};

export type MusicBrainzReleaseEvent = {
    date?: string;
    area?: MusicBrainzArea;
};

export type MusicBrainzRelease = {
    id: string;
    title: string;
    "status-id"?: string;
    status?: string;
    "artist-credit"?: MusicBrainzArtistCredit[];
    "artist-credit-id"?: string;
    "release-group"?: MusicBrainzReleaseGroup;
    date?: string;
    country?: string;
    "release-events"?: MusicBrainzReleaseEvent[];
    "track-count"?: number;
    media?: MusicBrainzMedia[];
    barcode?: string;
    "label-info"?: {
        "catalog-number"?: string;
        label?: {
            id: string;
            name: string;
        };
    }[];
    "text-representation"?: {
        language?: string;
        script?: string;
    };
    packaging?: string;
};

export type MusicBrainzRecording = {
    id: string;
    score: string;
    title: string;
    length?: number;
    video?: boolean | null;
    "artist-credit"?: MusicBrainzArtistCredit[];
    "artist-credit-id"?: string;
    "first-release-date"?: string;
    releases?: MusicBrainzRelease[];
    isrcs?: string[];
    tags?: MusicBrainzTag[];
    disambiguation?: string;
};

export type MusicBrainzRecordingSearchResponse = MusicBrainzSearchResponse<{
    recordings: MusicBrainzRecording[];
}>;

export type MusicBrainzReleaseGroupFull = {
    id: string;
    score: string;
    count?: number;
    title: string;
    "first-release-date"?: string;
    "primary-type"?: string;
    "secondary-types"?: string[];
    "artist-credit"?: MusicBrainzArtistCredit[];
    "artist-credit-id"?: string;
    releases?: {
        id: string;
        title: string;
        status?: string;
    }[];
    tags?: MusicBrainzTag[];
    aliases?: MusicBrainzAlias[];
};

export type MusicBrainzReleaseGroupSearchResponse = MusicBrainzSearchResponse<{
    "release-groups": MusicBrainzReleaseGroupFull[];
}>;

export type MusicBrainzReleaseSearchResponse = MusicBrainzSearchResponse<{
    releases: (MusicBrainzRelease & { score: string })[];
}>;

type SearchField = string | string[];

type MusicBrainzBaseFilters = {
    query?: string;
    tag?: SearchField;
    limit?: number;
    offset?: number;
    dismax?: boolean;
};

export type MusicBrainzArtistFilters = MusicBrainzBaseFilters & {
    name?: SearchField;
    country?: SearchField;
    type?: SearchField;
    gender?: SearchField;
    area?: SearchField;
    begin?: string;
    end?: string;
};

export type MusicBrainzRecordingFilters = MusicBrainzBaseFilters & {
    title?: SearchField;
    artist?: SearchField;
    release?: SearchField;
    isrc?: SearchField;
    dur?: number;
    country?: SearchField;
    date?: string;
    official_only?: boolean;
};

export type MusicBrainzReleaseGroupFilters = MusicBrainzBaseFilters & {
    title?: SearchField;
    artist?: SearchField;
    primary_type?: SearchField;
    secondary_type?: SearchField;
    first_release_date?: string;
    releases?: number;
};

export type MusicBrainzReleaseFilters = MusicBrainzBaseFilters & {
    title?: SearchField;
    artist?: SearchField;
    label?: SearchField;
    catno?: SearchField;
    country?: SearchField;
    date?: string;
    format?: SearchField;
    barcode?: SearchField;
    status?: SearchField;
    primary_type?: SearchField;
};

export type MusicBrainzEntityType = "artist" | "recording" | "release-group" | "release";

export type MusicBrainzEntityFilterMap = {
    artist: MusicBrainzArtistFilters;
    recording: MusicBrainzRecordingFilters;
    "release-group": MusicBrainzReleaseGroupFilters;
    release: MusicBrainzReleaseFilters;
};

export type MusicBrainzEntityResponseMap = {
    artist: MusicBrainzArtistSearchResponse;
    recording: MusicBrainzRecordingSearchResponse;
    "release-group": MusicBrainzReleaseGroupSearchResponse;
    release: MusicBrainzReleaseSearchResponse;
};
