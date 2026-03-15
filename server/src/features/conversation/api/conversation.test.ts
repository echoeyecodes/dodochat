import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import type { Request, Response, NextFunction } from "express";
import type { AuthRequest } from "@/features/common/types/request";
import app from "../../../app";
import { Conversation } from "../models/Conversation";

// mock auth middlewares
vi.mock("../../common/middlewares/attachUserToRequest", () => ({
    default: (req: Request, res: Response, next: NextFunction) => {
        if (req.headers["x-mock-unauthenticated"] === "true") {
            return next();
        }
        (req as AuthRequest).user_id = "507f1f77bcf86cd799439011";
        next();
    },
}));

vi.mock("../../common/middlewares/isAuthenticated", () => ({
    default: (req: Request, res: Response, next: NextFunction) => {
        if (req.headers["x-mock-unauthenticated"] === "true") {
            return res.status(401).json({ message: "Not authenticated" });
        }
        next();
    },
}));

describe("Conversation API Integration", () => {
    const user_id = "507f1f77bcf86cd799439011";

    describe("GET /api/conversations", () => {
        it("should return list of conversations when authenticated", async () => {
            const conversation = new Conversation({ user_id, title: "API Test Chat" });
            await conversation.save();

            const response = await request(app).get("/api/conversations");

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(
                response.body.data.some((c: { title: string }) => c.title === "API Test Chat"),
            ).toBe(true);
        });

        it("should return 401 when unauthenticated", async () => {
            const response = await request(app)
                .get("/api/conversations")
                .set("x-mock-unauthenticated", "true");
            expect(response.status).toBe(401);
        });
    });

    describe("POST /api/conversations", () => {
        it("should create a new conversation when authenticated", async () => {
            const response = await request(app).post("/api/conversations");

            expect(response.status).toBe(201);
            expect(response.body.data.title).toBe("New Chat");

            const doc = await Conversation.findById(response.body.data._id);
            expect(doc).toBeDefined();
        });

        it("should return 401 when unauthenticated", async () => {
            const response = await request(app)
                .post("/api/conversations")
                .set("x-mock-unauthenticated", "true");
            expect(response.status).toBe(401);
        });
    });

    describe("POST /api/conversations/:id/share", () => {
        it("should toggle visibility when authenticated", async () => {
            const conversation = new Conversation({ user_id, title: "Share Test" });
            await conversation.save();

            const response = await request(app)
                .post(`/api/conversations/${conversation._id}/share`)
                .send({ visibility: "public" });

            expect(response.status).toBe(200);
            expect(response.body.data.visibility).toBe("public");
            expect(response.body.data.share_token).toBeDefined();
        });

        it("should return 401 when unauthenticated", async () => {
            const response = await request(app)
                .post("/api/conversations/some-id/share")
                .set("x-mock-unauthenticated", "true");
            expect(response.status).toBe(401);
        });
    });

    describe("GET /api/conversations/public/:token", () => {
        it("should allow anonymous access", async () => {
            const conversation = new Conversation({
                user_id,
                title: "Public Chat",
                visibility: "public",
                share_token: "test-token",
            });
            await conversation.save();

            const response = await request(app)
                .get("/api/conversations/public/test-token")
                .set("x-mock-unauthenticated", "true");

            expect(response.status).toBe(200);
            expect(response.body.data.title).toBe("Public Chat");
        });
    });

    describe("POST /api/conversations/public/:token/fork", () => {
        it("should clone conversation for current user when authenticated", async () => {
            const other_user = "507f1f77bcf86cd799439012";
            const original = new Conversation({
                user_id: other_user,
                title: "Original",
                visibility: "public",
                share_token: "fork-me",
            });
            await original.save();

            const response = await request(app).post("/api/conversations/public/fork-me/fork");

            expect(response.status).toBe(201);
            expect(response.body.data.title).toBe("Original (Forked)");
            expect(response.body.data._id).not.toBe(original._id.toString());
        });

        it("should return 401 when unauthenticated", async () => {
            const response = await request(app)
                .post("/api/conversations/public/some-token/fork")
                .set("x-mock-unauthenticated", "true");
            expect(response.status).toBe(401);
        });
    });
});
