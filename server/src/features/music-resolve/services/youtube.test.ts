import { describe, it, expect, beforeEach } from "vitest";
import { YoutubeMusicProvider } from "./youtube";
import nock from "nock";

describe("YoutubeMusicProvider", () => {
    let provider: YoutubeMusicProvider;

    beforeEach(() => {
        provider = new YoutubeMusicProvider();
        nock.cleanAll();
    });

    it("should resolve a video correctly", async () => {
        const mockResponse = {
            items: [
                {
                    id: { videoId: "test_vid_id" },
                    snippet: { title: "Test Song", description: "Desc" },
                },
            ],
        };

        nock("https://www.googleapis.com")
            .get("/youtube/v3/search")
            .query(true)
            .reply(200, mockResponse);

        const result = await provider.resolveLink("Test Song");

        expect(result.platform).toBe("youtube");
        expect(result.link).toBe("https://music.youtube.com/watch?v=test_vid_id");
    });

    it("should throw error when no video found", async () => {
        nock("https://www.googleapis.com")
            .get("/youtube/v3/search")
            .query(true)
            .reply(200, { items: [] });

        await expect(provider.resolveLink("No Video")).rejects.toThrow();
    });
});
