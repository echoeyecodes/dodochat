import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import app from "../../../app";
import nock from "nock";
import mongoose from "mongoose";
import encryption from "../../../lib/encryption";
import envConfig from "@/lib/env";
import type { Request, Response, NextFunction } from "express";
import type { AuthRequest } from "../../common/types/request";

vi.mock("../../common/middlewares/attachUserToRequest", () => ({
    default: (req: Request, _res: Response, next: NextFunction) => {
        (req as AuthRequest).user_id = "507f1f77bcf86cd799439011";
        next();
    },
}));

vi.mock("../../common/middlewares/isAuthenticated", () => ({
    default: (_req: Request, _res: Response, next: NextFunction) => {
        next();
    },
}));

describe("Connected Accounts API", () => {
    const user_id = "507f1f77bcf86cd799439011";
    const secret = envConfig.get("OAUTH_STATE_SECRET");

    beforeEach(() => {
        vi.clearAllMocks();
        nock.cleanAll();
        // Setup env vars for encryption in tests
        process.env.OAUTH_STATE_SECRET = secret;
        process.env.WEBSITE_URL = "http://localhost:3000";
    });

    describe("GET /api/connected-accounts", () => {
        it("should return connected accounts for user", async () => {
            const response = await request(app).get("/api/connected-accounts");
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body.data)).toBe(true);
        });
    });

    describe("GET /api/connected-accounts/:provider/connect", () => {
        it("should return auth URL and set cookie", async () => {
            const response = await request(app).get("/api/connected-accounts/spotify/connect");

            expect(response.status).toBe(200);
            expect(response.body.data.authUrl).toContain("accounts.spotify.com/authorize");
            expect(response.headers["set-cookie"]).toBeDefined();
            expect(response.headers["set-cookie"]?.[0])?.toContain("oauth_auth_state");
        });

        it("should return 400 for unsupported provider due to zod", async () => {
            const response = await request(app).get("/api/connected-accounts/invalid/connect");
            expect(response.status).toBe(400);
        });
    });

    describe("GET /api/connected-accounts/:provider/callback", () => {
        it("should handle successful callback and store in DB", async () => {
            const state = encryption.encrypt({
                seed: secret,
                value: JSON.stringify({ user_id, provider: "spotify" }),
            });

            nock("https://accounts.spotify.com").post("/api/token").reply(200, {
                access_token: "mock_access",
                refresh_token: "mock_refresh",
                expires_in: 3600,
            });

            nock("https://api.spotify.com").get("/v1/me").reply(200, {
                id: "spotify_id",
                display_name: "Spotify User",
            });

            const response = await request(app)
                .get("/api/connected-accounts/spotify/callback")
                .query({ code: "mock_code", state })
                .set("Cookie", [`oauth_auth_state=${state}`]);

            expect(response.status).toBe(200);
            expect(response.body.data.success).toBe(true);

            const AccountModel = mongoose.model("ConnectedAccount");
            const account = await AccountModel.findOne({ user_id, provider: "spotify" });
            expect(account).toBeDefined();
            expect(account?.display_name).toBe("Spotify User");
            expect(account?.provider_id).toBe("spotify_id");
        });

        it("should fail with invalid state", async () => {
            const response = await request(app)
                .get("/api/connected-accounts/spotify/callback")
                .query({ code: "mock_code", state: "invalid" })
                .set("Cookie", ["oauth_auth_state=correct_state"]);

            expect(response.status).toBe(500);
        });
    });

    describe("DELETE /api/connected-accounts/:id", () => {
        it("should disconnect account from DB", async () => {
            const AccountModel = mongoose.model("ConnectedAccount");
            const newAccount = await AccountModel.create({
                user_id: new mongoose.Types.ObjectId(user_id),
                provider: "spotify",
                provider_id: "test",
                display_name: "Test",
                access_token: "test",
            });

            const response = await request(app).delete(`/api/connected-accounts/${newAccount._id}`);

            expect(response.status).toBe(200);
            expect(response.body.data.message).toBe("Account disconnected successfully");

            const deletedAccount = await AccountModel.findById(newAccount._id);
            expect(deletedAccount).toBeNull();
        });
    });
});
