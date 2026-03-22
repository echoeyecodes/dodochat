import { describe, it, expect } from "vitest";
import { AppleMusicProvider } from "./apple";
import { SpotifyMusicProvider } from "./spotify";
import { YoutubeMusicProvider } from "./youtube";
import { BaseMusicProvider } from "./provider";

describe("Music Providers consistency", () => {
    it("should all extend BaseMusicProvider", () => {
        const apple = new AppleMusicProvider();
        const spotify = new SpotifyMusicProvider();
        const youtube = new YoutubeMusicProvider();

        expect(apple).toBeInstanceOf(BaseMusicProvider);
        expect(spotify).toBeInstanceOf(BaseMusicProvider);
        expect(youtube).toBeInstanceOf(BaseMusicProvider);
    });
});
