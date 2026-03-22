export type MusicResolveResult = {
    link: string;
    platform: "apple" | "spotify" | "youtube";
};

export abstract class BaseMusicProvider {
    abstract resolveLink(query: string): Promise<MusicResolveResult>;
}
