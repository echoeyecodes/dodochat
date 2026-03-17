import request from "@/lib/request/index";
import type {
    MusicBrainzEntityType,
    MusicBrainzEntityFilterMap,
    MusicBrainzEntityResponseMap,
} from "./types/index";

const USER_AGENT = "Dodochat/1.0 (https://dodochat.echoeyecodes.com)";

const OFFICIAL_SONG_FILTER = [
    "status:Official",
    "-secondarytype:Interview",
    "-secondarytype:Spokenword",
    "-secondarytype:Audiobook",
    '-secondarytype:"Audio drama"',
    "-secondarytype:Demo",
    "-secondarytype:Live",
    "-secondarytype:Remix",
    "-video:true",
    "-recording:remix",
    "-recording:instrumental",
    "-recording:live",
    "-recording:edit",
    "-recording:mix",
    "-recording:version",
    "-disambiguation:remix",
    "-disambiguation:instrumental",
    "-disambiguation:live",
    "-disambiguation:edit",
    "-disambiguation:demo",
    "-disambiguation:mix",
    "-disambiguation:version",
].join(" AND ");

const FIELD_MAPS: Record<string, Record<string, string>> = {
    artist: {
        name: "artist",
        country: "country",
        type: "type",
        gender: "gender",
        area: "area",
        tag: "tag",
        begin: "begin",
        end: "end",
    },
    recording: {
        title: "recording",
        artist: "artistname",
        release: "release",
        isrc: "isrc",
        dur: "dur",
        country: "country",
        date: "date",
        tag: "tag",
    },
    "release-group": {
        title: "releasegroup",
        artist: "artistname",
        primary_type: "primarytype",
        secondary_type: "secondarytype",
        first_release_date: "firstreleasedate",
        tag: "tag",
        releases: "releases",
    },
    release: {
        title: "release",
        artist: "artistname",
        label: "label",
        catno: "catno",
        country: "country",
        date: "date",
        format: "format",
        barcode: "barcode",
        status: "status",
        primary_type: "primarytype",
        tag: "tag",
    },
};

const META_KEYS = new Set(["query", "limit", "offset", "dismax", "official_only"]);

export class MusicBrainzClient {
    private api_base = "https://musicbrainz.org/ws/2";
    private last_request_time = 0;
    private rate_limit_ms = 1100;

    private async throttle(): Promise<void> {
        const now = Date.now();
        const elapsed = now - this.last_request_time;

        if (elapsed < this.rate_limit_ms) {
            await new Promise((resolve) => setTimeout(resolve, this.rate_limit_ms - elapsed));
        }

        this.last_request_time = Date.now();
    }

    private buildLuceneQuery(entity: string, filters: Record<string, unknown>): string {
        const field_map = FIELD_MAPS[entity] ?? {};
        const parts: string[] = [];

        for (const [key, value] of Object.entries(filters)) {
            if (META_KEYS.has(key) || value === undefined || value === null) continue;

            const lucene_field = field_map[key] ?? key;

            if (Array.isArray(value)) {
                const or_parts = value.map((v) =>
                    typeof v === "number" || typeof v === "boolean"
                        ? `${lucene_field}:${v}`
                        : `${lucene_field}:"${v}"`,
                );
                if (or_parts.length > 0) {
                    parts.push(`(${or_parts.join(" OR ")})`);
                }
            } else if (typeof value === "number" || typeof value === "boolean") {
                parts.push(`${lucene_field}:${value}`);
            } else {
                parts.push(`${lucene_field}:"${value}"`);
            }
        }

        if (typeof filters.query === "string" && filters.query.length > 0) {
            parts.push(filters.query);
        }

        if (entity === "recording" && filters.official_only === true) {
            parts.push(OFFICIAL_SONG_FILTER);
        }

        return parts.join(" AND ");
    }

    async search<E extends MusicBrainzEntityType>(
        entity: E,
        filters: MusicBrainzEntityFilterMap[E],
    ): Promise<MusicBrainzEntityResponseMap[E]> {
        await this.throttle();

        const lucene_query = this.buildLuceneQuery(entity, filters as Record<string, unknown>);

        const query: Record<string, unknown> = {
            query: lucene_query,
            fmt: "json",
        };

        if (filters.limit !== undefined) {
            query.limit = Math.min(Math.max(filters.limit, 1), 100);
        }

        if (filters.offset !== undefined) {
            query.offset = filters.offset;
        }

        if (filters.dismax) {
            query.dismax = "true";
        }

        const { data } = await request({
            base: this.api_base,
            path: entity,
            method: "GET",
            headers: {
                "User-Agent": USER_AGENT,
                Accept: "application/json",
            },
            query,
            exclude_trailing_slash: true,
        });

        return data as MusicBrainzEntityResponseMap[E];
    }
}
