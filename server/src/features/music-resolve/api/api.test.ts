import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../../../app";
import nock from "nock";

describe("Music Resolve API", () => {
    beforeEach(() => {
        nock.cleanAll();
    });

    describe("GET /api/music/resolve", () => {
        it("should return apple music link for apple platform", async () => {
            const mockLink = "https://music.apple.com/test-song";
            nock("https://itunes.apple.com")
                .get("/search")
                .query(true)
                .reply(200, {
                    results: [{ trackViewUrl: mockLink }],
                });

            const response = await request(app)
                .get("/api/music/resolve")
                .query({ query: "Test Song", platform: "apple" });

            expect(response.status).toBe(200);
            expect(response.body.data.link).toBe(mockLink);
            expect(response.body.data.platform).toBe("apple");
        });

        it("should return spotify link for spotify platform", async () => {
            const mockLink = "https://open.spotify.com/track/test";

            nock("https://accounts.spotify.com")
                .post("/api/token")
                .reply(200, { access_token: "test_token", expires_in: 3600 });

            nock("https://api.spotify.com")
                .get("/v1/search")
                .query(true)
                .reply(200, {
                    tracks: {
                        items: [{ external_urls: { spotify: mockLink } }],
                    },
                });

            const response = await request(app)
                .get("/api/music/resolve")
                .query({ query: "Test Song", platform: "spotify" });

            expect(response.status).toBe(200);
            expect(response.body.data.link).toBe(mockLink);
            expect(response.body.data.platform).toBe("spotify");
        });

        it("should return youtube link for youtube platform", async () => {
            const mockVidId = "test_vid_id";
            nock("https://www.googleapis.com")
                .get("/youtube/v3/search")
                .query(true)
                .reply(200, {
                    items: [
                        {
                            id: { videoId: mockVidId },
                            snippet: { title: "Title", description: "Desc" },
                        },
                    ],
                });

            const response = await request(app)
                .get("/api/music/resolve")
                .query({ query: "Test Song", platform: "youtube" });

            expect(response.status).toBe(200);
            expect(response.body.data.link).toBe(`https://music.youtube.com/watch?v=${mockVidId}`);
            expect(response.body.data.platform).toBe("youtube");
        });

        it("should return 400 for validation profile errors", async () => {
            const response = await request(app)
                .get("/api/music/resolve")
                .query({ query: "", platform: "spotify" });

            expect(response.status).toBe(400);
        });

        it("should return 400 for invalid platform", async () => {
            const response = await request(app)
                .get("/api/music/resolve")
                .query({ query: "Test Song", platform: "invalid" });

            expect(response.status).toBe(400);
        });

        it("should return 500 when provider fails with external error", async () => {
            nock("https://itunes.apple.com").get("/search").query(true).reply(500);

            const response = await request(app)
                .get("/api/music/resolve")
                .query({ query: "Test Song", platform: "apple" });

            expect(response.status).toBe(500);
        });
    });
});
