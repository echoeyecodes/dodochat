import { describe, it, expect } from "vitest";
import encryption from "./index";

describe("Encryption utility", () => {
    const seed = "test-seed-key";
    const plainText = "Hello World! This is a secret message.";

    it("should encrypt and decrypt correctly", () => {
        const encrypted = encryption.encrypt({ seed, value: plainText });
        expect(encrypted).not.toBe(plainText);
        expect(encrypted.includes(":")).toBe(true);

        const decrypted = encryption.decrypt({ seed, value: encrypted });
        expect(decrypted).toBe(plainText);
    });

    it("should throw for invalid encrypted format", () => {
        expect(() => encryption.decrypt({ seed, value: "invalidformat" })).toThrow(
            "Invalid encrypted value format",
        );
    });

    it("should fail to decrypt with wrong seed", () => {
        const encrypted = encryption.encrypt({ seed, value: plainText });
        expect(() => encryption.decrypt({ seed: "wrong-seed", value: encrypted })).toThrow();
    });

    it("should produce different ciphertexts for same input (different IVs)", () => {
        const encrypted1 = encryption.encrypt({ seed, value: plainText });
        const encrypted2 = encryption.encrypt({ seed, value: plainText });
        expect(encrypted1).not.toBe(encrypted2);

        expect(encryption.decrypt({ seed, value: encrypted1 })).toBe(plainText);
        expect(encryption.decrypt({ seed, value: encrypted2 })).toBe(plainText);
    });
});
