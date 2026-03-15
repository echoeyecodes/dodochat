import { describe, it, expect, vi } from "vitest";
import mongoose from "mongoose";
import { Conversation } from "../models/Conversation";
import { CONVERSATION_VISIBILITY } from "../constants";
import { mediaRepository } from "../../media/repository/index";

import { createConversation } from "./createConversation";
import { getConversationById } from "./getConversationById";
import { listConversations } from "./listConversations";
import { updateConversation } from "./updateConversation";
import { deleteConversation } from "./deleteConversation";
import { appendMessages } from "./appendMessages";
import { findOrCreateConversation } from "./findOrCreateConversation";
import { autoTitle } from "./autoTitle";
import { toggleSharing } from "./toggleSharing";
import { getSharedConversation } from "./getSharedConversation";
import { forkConversation } from "./forkConversation";
import type { Message } from "../types/index";

// Mock media repository
vi.mock("../../media/repository/index", () => ({
    mediaRepository: {
        deleteFilesByConversationId: vi.fn().mockResolvedValue(true),
    },
}));

describe("Conversation Repository", () => {
    const user_id = new mongoose.Types.ObjectId().toString();

    describe("CRUD Operations", () => {
        it("should create a new conversation", async () => {
            const result = await createConversation({ user_id });
            expect(result).toHaveProperty("_id");
            expect(result.title).toBe("New Chat");

            const doc = await Conversation.findById(result._id);
            expect(doc).toBeDefined();
            expect(doc?.user_id.toString()).toBe(user_id);
        });

        it("should get a conversation by id", async () => {
            const created = await createConversation({ user_id });
            const result = await getConversationById({ user_id, id: created._id.toString() });

            expect(result._id.toString()).toBe(created._id.toString());
            expect(result.title).toBe("New Chat");
        });

        it("should throw error when getting non-existent conversation", async () => {
            await expect(
                getConversationById({ user_id, id: "507f1f77bcf86cd799439011" }),
            ).rejects.toThrow();
        });

        it("should list conversations for a user", async () => {
            await createConversation({ user_id });
            await createConversation({ user_id });

            const list = await listConversations({ user_id });
            expect(list.length).toBe(2);
            expect(list[0]).toHaveProperty("preview");
        });

        it("should update a conversation title", async () => {
            const created = await createConversation({ user_id });
            const updated = await updateConversation({
                user_id,
                id: created._id.toString(),
                updateData: { title: "Updated Title" },
            });

            expect(updated.title).toBe("Updated Title");

            const doc = await Conversation.findById(created._id);
            expect(doc?.title).toBe("Updated Title");
        });

        it("should delete a conversation", async () => {
            const created = await createConversation({ user_id });
            await deleteConversation({ user_id, id: created._id.toString() });

            const doc = await Conversation.findById(created._id);
            expect(doc).toBeNull();
            expect(mediaRepository.deleteFilesByConversationId).toHaveBeenCalledWith(
                created._id.toString(),
            );
        });
    });

    describe("Messaging", () => {
        it("should find or create a conversation", async () => {
            const fresh = await findOrCreateConversation({ user_id });
            expect(fresh.isNew).toBe(true);
            expect(fresh.user_id.toString()).toBe(user_id);

            await fresh.save();
            const found = await findOrCreateConversation({
                user_id,
                conversationId: fresh._id.toString(),
            });
            expect(found.isNew).toBe(false);
            expect(found._id.toString()).toBe(fresh._id.toString());
        });

        it("should append messages to a conversation", async () => {
            const conversation = new Conversation({ user_id, messages: [] });
            await conversation.save();

            const newMessages = [
                {
                    id: "1",
                    role: "user",
                    parts: [{ type: "text", text: "Hello" }],
                    created_at: new Date(),
                },
                {
                    id: "2",
                    role: "assistant",
                    parts: [{ type: "text", text: "Hi" }],
                    created_at: new Date(),
                },
            ] as Message[];

            await appendMessages(conversation, newMessages);

            const doc = await Conversation.findById(conversation._id);
            expect(doc!.messages.length).toBe(2);
            expect(doc!.messages[0]!.parts[0]!.text).toBe("Hello");
        });

        it("should automatically set title from first user message", async () => {
            const conversation = new Conversation({
                user_id,
                title: "New Chat",
                messages: [
                    {
                        id: "1",
                        role: "user",
                        parts: [{ type: "text", text: "What is the capital of France?" }],
                        created_at: new Date(),
                    },
                ],
            });
            await conversation.save();

            await autoTitle(conversation);
            expect(conversation.title).toBe("What is the capital of France?");

            const doc = await Conversation.findById(conversation._id);
            expect(doc?.title).toBe("What is the capital of France?");
        });

        it('should not change title if it is not "New Chat"', async () => {
            const conversation = new Conversation({
                user_id,
                title: "Existing Title",
                messages: [
                    {
                        id: "1",
                        role: "user",
                        parts: [{ type: "text", text: "Another message" }],
                        created_at: new Date(),
                    },
                ],
            });
            await conversation.save();

            await autoTitle(conversation);
            expect(conversation.title).toBe("Existing Title");
        });
    });

    describe("Sharing & Forking Flow", () => {
        const other_user_id = new mongoose.Types.ObjectId().toString();

        it("should toggle sharing to public and generate a token", async () => {
            const conversation = new Conversation({ user_id, title: "Test Chat" });
            await conversation.save();

            const updated = await toggleSharing({
                user_id,
                id: conversation._id.toString(),
                visibility: CONVERSATION_VISIBILITY.PUBLIC,
            });

            expect(updated.visibility).toBe(CONVERSATION_VISIBILITY.PUBLIC);
            expect(updated.share_token).toBeDefined();
        });

        it("should toggle sharing back to private and remove token", async () => {
            const conversation = new Conversation({
                user_id,
                title: "Test Chat",
                visibility: CONVERSATION_VISIBILITY.PUBLIC,
                share_token: "some-token",
            });
            await conversation.save();

            const updated = await toggleSharing({
                user_id,
                id: conversation._id.toString(),
                visibility: CONVERSATION_VISIBILITY.PRIVATE,
            });

            expect(updated.visibility).toBe(CONVERSATION_VISIBILITY.PRIVATE);
            expect(updated.share_token).toBeUndefined();
        });

        it("should get a shared conversation by token", async () => {
            const conversation = new Conversation({
                user_id,
                title: "Public Chat",
                visibility: CONVERSATION_VISIBILITY.PUBLIC,
                share_token: "token123",
            });
            await conversation.save();

            const shared = await getSharedConversation({ token: "token123" });
            expect(shared.title).toBe("Public Chat");
            expect(shared.visibility).toBe(CONVERSATION_VISIBILITY.PUBLIC);
        });

        it("should fork a public conversation", async () => {
            const original = new Conversation({
                user_id: other_user_id,
                title: "Original Chat",
                visibility: CONVERSATION_VISIBILITY.PUBLIC,
                share_token: "original-token",
                messages: [
                    {
                        id: "1",
                        role: "user",
                        parts: [{ type: "text", text: "Hello" }],
                        created_at: new Date(),
                    },
                ],
            });
            await original.save();

            const forked = await forkConversation({ user_id, share_token: "original-token" });

            expect(forked.user_id.toString()).toBe(user_id);
            expect(forked.title).toBe("Original Chat (Forked)");
            expect(forked.messages.length).toBe(1);
            expect(forked.visibility).toBe(CONVERSATION_VISIBILITY.PRIVATE);
            expect(forked._id.toString()).not.toBe(original._id.toString());
        });
    });
});
