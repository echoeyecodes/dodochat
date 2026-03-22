import { describe, it, expect, beforeEach } from "vitest";
import { AppleMusicProvider } from "./apple";
import nock from "nock";

describe("AppleMusicProvider", () => {
    let provider: AppleMusicProvider;

    beforeEach(() => {
        provider = new AppleMusicProvider();
        nock.cleanAll();
    });

    it("should resolve a song query correctly", async () => {
        const mockData = {
            results: [{ trackViewUrl: "https://music.apple.com/test-song" }],
        };

        nock("https://itunes.apple.com")
            .get("/search")
            .query({
                term: "Test Song",
                entity: "song",
                limit: "1",
            })
            .reply(200, mockData);

        const result = await provider.resolveLink("Test Song");

        expect(result.platform).toBe("apple");
        expect(result.link).toBe("https://music.apple.com/test-song");
    });

    it("should throw error when no results found", async () => {
        nock("https://itunes.apple.com").get("/search").query(true).reply(200, { results: [] });

        await expect(provider.resolveLink("No Result")).rejects.toThrow();
    });

    it("should handle error during resolution", async () => {
        nock("https://itunes.apple.com")
            .get("/search")
            .query(true)
            .reply(500, "Internal Server Error");

        await expect(provider.resolveLink("Error Song")).rejects.toThrow();
    });
});
