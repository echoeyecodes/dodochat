import { describe, it, expect, beforeEach } from "vitest";
import { SpotifyMusicProvider } from "./spotify";
import nock from "nock";

describe("SpotifyMusicProvider", () => {
    let provider: SpotifyMusicProvider;

    beforeEach(() => {
        provider = new SpotifyMusicProvider();
        nock.cleanAll();
    });

    it("should resolve a track correctly", async () => {
        const mockTokenResponse = {
            access_token: "mock_token",
            expires_in: 3600,
            token_type: "Bearer",
        };
        const mockSearchResponse = {
            tracks: {
                items: [{ external_urls: { spotify: "https://open.spotify.com/track/test" } }],
            },
        };

        nock("https://accounts.spotify.com").post("/api/token").reply(200, mockTokenResponse);

        nock("https://api.spotify.com")
            .get("/v1/search")
            .query({
                q: "Test Song",
                type: "track",
                limit: "1",
            })
            .reply(200, mockSearchResponse);

        const result = await provider.resolveLink("Test Song");

        expect(result.platform).toBe("spotify");
        expect(result.link).toBe("https://open.spotify.com/track/test");
    });

    it("should throw error when no track found", async () => {
        nock("https://accounts.spotify.com")
            .post("/api/token")
            .reply(200, { access_token: "mock_token", expires_in: 3600 });

        nock("https://api.spotify.com")
            .get("/v1/search")
            .query(true)
            .reply(200, { tracks: { items: [] } });

        await expect(provider.resolveLink("No Track")).rejects.toThrow();
    });
});
