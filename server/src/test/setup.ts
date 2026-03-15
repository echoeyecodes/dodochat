import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { afterAll, beforeAll, beforeEach, vi } from "vitest";

vi.mock("firebase-admin", () => {
    const mockAuth = {
        verifyIdToken: vi.fn(),
    };
    const mockApp = {
        auth: () => mockAuth,
    };
    return {
        default: {
            credential: {
                cert: vi.fn(() => ({})),
            },
            initializeApp: vi.fn(() => mockApp),
            apps: [],
            auth: () => mockAuth,
        },
    };
});

let mongo: MongoMemoryServer;

beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    await mongoose.connect(uri);
});

beforeEach(async () => {
    if (mongoose.connection.db) {
        const collections = await mongoose.connection.db.collections();
        for (let collection of collections) {
            await collection.deleteMany({});
        }
    }
});

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.disconnect();
});
