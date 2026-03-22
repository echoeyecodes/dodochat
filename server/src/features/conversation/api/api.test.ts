import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import type { Request, Response, NextFunction } from "express";
import type { AuthRequest } from "@/features/common/types/request";
import app from "../../../app";
import { Conversation } from "../models/Conversation";
import { File } from "../../media/models/File";
import { getAllTools } from "../tools";
import type { ZodObject, ZodTypeAny } from "zod";
import { igdbApi } from "../../igdb";

type CoreTool = {
    inputSchema: ZodObject<Record<string, ZodTypeAny>>;
    outputSchema?: ZodTypeAny;
    execute: (input: Record<string, unknown>) => Promise<unknown>;
};

vi.mock("../../common/middlewares/attachUserToRequest", () => ({
    default: (req: Request, res: Response, next: NextFunction) => {
        if (req.headers["x-mock-unauthenticated"] === "true") {
            return next();
        }
        (req as AuthRequest).user_id = "507f1f77bcf86cd799439011";
        next();
    },
}));

type MockStep = {
    content: Array<{
        type: string;
        toolName?: string;
        toolCallId?: string;
        input?: Record<string, unknown>;
        output?: unknown;
        text?: string;
    }>;
};

const { mockSteps, mockStreamText, mockMBSearch } = vi.hoisted(() => {
    const steps: MockStep[] = [];
    const searchFn = vi.fn();
    const createStream = () =>
        new ReadableStream({
            start(controller) {
                controller.enqueue(new TextEncoder().encode('0:"Hello"\n'));
                controller.close();
            },
        });

    return {
        mockSteps: steps,
        mockStreamText: vi.fn().mockImplementation(() => ({
            toUIMessageStreamResponse: vi.fn().mockReturnValue({
                status: 200,
                headers: new Map([["Content-Type", "text/plain"]]),
                body: createStream(),
            }),
            steps: steps,
        })),
        mockMBSearch: searchFn,
    };
});

vi.mock("ai", async (importOriginal) => {
    const actual = (await importOriginal()) as Record<string, unknown>;
    return {
        ...actual,
        streamText: mockStreamText,
        convertToModelMessages: vi.fn((m: unknown) => m),
        embed: vi.fn().mockResolvedValue({ embedding: [0.1, 0.2] }),
        stepCountIs: vi.fn(),
    };
});

vi.mock("@ai-sdk/google", () => ({
    createGoogleGenerativeAI: vi.fn(() => {
        const provider = vi.fn() as unknown as { textEmbeddingModel: ReturnType<typeof vi.fn> };
        provider.textEmbeddingModel = vi.fn();
        return provider;
    }),
}));

vi.mock("../../igdb", () => ({
    igdbApi: {
        getGames: vi.fn(),
        getGame: vi.fn(),
    },
}));

vi.mock("../../../lib/musicbrainz/musicbrainz-client", () => ({
    MusicBrainzClient: class {
        search = mockMBSearch;
    },
}));

vi.mock("../../../lib/storage", () => ({
    default: {
        upload: vi.fn().mockResolvedValue({}),
        get: vi.fn().mockResolvedValue(Buffer.from("test")),
    },
}));

vi.mock("sharp", () => ({
    default: vi.fn().mockReturnValue({
        grayscale: vi.fn().mockReturnThis(),
        rotate: vi.fn().mockReturnThis(),
        toBuffer: vi.fn().mockResolvedValue(Buffer.from("processed")),
    }),
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
    });

    describe("POST /api/conversations/chat - Tool Calls", () => {
        const setupChat = async (
            input: string,
            customSteps: MockStep[] = [],
            existingConversationId?: string,
        ) => {
            let conversation_id = existingConversationId;
            if (!conversation_id) {
                const conversation = new Conversation({ user_id, title: "Tool Test" });
                await conversation.save();
                conversation_id = conversation._id.toString();
            }
            mockSteps.length = 0;
            mockSteps.push(...customSteps);

            const response = await request(app)
                .post("/api/conversations/chat")
                .send({
                    messages: [{ id: "1", role: "user", parts: [{ type: "text", text: input }] }],
                    conversationId: conversation_id,
                });

            if (mockStreamText.mock.calls.length > 0) {
                const callOptions =
                    mockStreamText.mock.calls[mockStreamText.mock.calls.length - 1]?.[0];
                if (callOptions.onFinish) {
                    await callOptions.onFinish({ steps: customSteps });
                }
            }

            return { conversation_id, response };
        };

        it("should handle system info tool call", async () => {
            const allTools = getAllTools(user_id) as unknown as Record<string, CoreTool>;
            const tool = allTools.getSystemInfo;
            if (!tool) throw new Error("Tool not found");
            const input = {};

            expect(() => tool.inputSchema.parse(input)).not.toThrow();
            const result = await tool.execute(input);
            if (tool.outputSchema && "parse" in tool.outputSchema) {
                (tool.outputSchema as ZodTypeAny).parse(result);
            }

            const steps = [
                {
                    content: [
                        {
                            type: "tool-call",
                            toolName: "getSystemInfo",
                            toolCallId: "call-1",
                            input,
                        },
                        { type: "tool-result", toolCallId: "call-1", output: result },
                    ],
                },
            ];

            const { conversation_id, response } = await setupChat("system info", steps);
            expect(response.status).toBe(200);

            const updated = await Conversation.findById(conversation_id);
            const assistantMsg = updated?.messages.find((m) => m.role === "assistant");
            const toolPart = assistantMsg?.parts.find((p) => p.type === "tool-getSystemInfo");
            expect(toolPart).toBeDefined();
            expect((toolPart as Record<string, unknown>).output).toEqual(result);
        });

        it("should handle igdb games tool call", async () => {
            const allTools = getAllTools(user_id) as unknown as Record<string, CoreTool>;
            const tool = allTools.searchGames;
            if (!tool) throw new Error("Tool not found");
            const input = { query: "cyberpunk", limit: 3 };

            const mockGames = [{ name: "Cyberpunk 2077", id: 123 }];
            (
                igdbApi.getGames as unknown as { mockResolvedValue: (v: unknown) => void }
            ).mockResolvedValue(mockGames);

            expect(() => tool.inputSchema.parse(input)).not.toThrow();
            const result = await tool.execute(input);

            const steps = [
                {
                    content: [
                        { type: "tool-call", toolName: "searchGames", toolCallId: "call-2", input },
                        { type: "tool-result", toolCallId: "call-2", output: result },
                    ],
                },
            ];
            const { conversation_id } = await setupChat("search games", steps);
            const updated = await Conversation.findById(conversation_id);
            const assistantMsg = updated?.messages.find((m) => m.role === "assistant");
            expect(assistantMsg?.parts.some((p) => p.type === "tool-searchGames")).toBe(true);
        });

        it("should handle music tools call", async () => {
            const allTools = getAllTools(user_id) as unknown as Record<string, CoreTool>;
            const tool = allTools.randomSongs;
            if (!tool) throw new Error("Tool not found");
            const input = { genre: "rock", limit: 3 };

            const mockRecordings = {
                recordings: [
                    {
                        title: "Song A",
                        id: "1",
                        "artist-credit": [{ artist: { name: "Artist A" } }],
                        releases: [{ title: "Album A", date: "2020", id: "rel-1" }],
                    },
                ],
            };
            mockMBSearch.mockResolvedValue(mockRecordings);

            expect(() => tool.inputSchema.parse(input)).not.toThrow();
            const result = await tool.execute(input);

            const steps = [
                {
                    content: [
                        { type: "tool-call", toolName: "randomSongs", toolCallId: "call-3", input },
                        { type: "tool-result", toolCallId: "call-3", output: result },
                    ],
                },
            ];
            const { conversation_id } = await setupChat("random songs", steps);
            const updated = await Conversation.findById(conversation_id);
            const assistantMsg = updated?.messages.find((m) => m.role === "assistant");
            expect(assistantMsg?.parts.some((p) => p.type === "tool-randomSongs")).toBe(true);
        });

        it("should handle apply image effect tool call", async () => {
            const allTools = getAllTools(user_id) as unknown as Record<string, CoreTool>;
            const tool = allTools.applyImageEffect;
            if (!tool) throw new Error("Tool not found");

            const conversation = new Conversation({ user_id, title: "Image Test" });
            await conversation.save();

            const testFile = new File({
                name: "test.jpg",
                type: "image/jpeg",
                size: 1024,
                path: "uploads/test.jpg",
                conversation_id: conversation._id,
                chunks: [],
            });
            await testFile.save();

            const input = {
                fileId: testFile._id.toString(),
                effect: "grayscale" as const,
                conversationId: conversation._id.toString(),
            };

            expect(() => tool.inputSchema.parse(input)).not.toThrow();
            const result = await tool.execute(input);

            const steps = [
                {
                    content: [
                        {
                            type: "tool-call",
                            toolName: "applyImageEffect",
                            toolCallId: "call-4",
                            input,
                        },
                        { type: "tool-result", toolCallId: "call-4", output: result },
                    ],
                },
            ];
            const { response } = await setupChat(
                "apply grayscale",
                steps,
                conversation._id.toString(),
            );
            expect(response.status).toBe(200);

            const updated = await Conversation.findById(conversation._id);
            const assistantMsg = updated?.messages.find((m) => m.role === "assistant");
            expect(assistantMsg?.parts.some((p) => p.type === "tool-applyImageEffect")).toBe(true);
        });

        it("should handle generate file tool call", async () => {
            const allTools = getAllTools(user_id) as unknown as Record<string, CoreTool>;
            const tool = allTools.generateFile;
            if (!tool) throw new Error("Tool not found");
            const input = {
                format: "txt",
                filename: "test",
                content: "hello",
                conversationId: user_id,
            };

            expect(() => tool.inputSchema.parse(input)).not.toThrow();
            const result = await tool.execute(input);

            const steps = [
                {
                    content: [
                        {
                            type: "tool-call",
                            toolName: "generateFile",
                            toolCallId: "call-5",
                            input,
                        },
                        { type: "tool-result", toolCallId: "call-5", output: result },
                    ],
                },
            ];
            const { conversation_id } = await setupChat("make a pdf", steps);
            const updated = await Conversation.findById(conversation_id);
            const assistantMsg = updated?.messages.find((m) => m.role === "assistant");
            expect(assistantMsg?.parts.some((p) => p.type === "tool-generateFile")).toBe(true);
        });
    });
});
