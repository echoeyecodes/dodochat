import crypto from "crypto";

const IV_LENGTH = 16;

const encrypt = ({ seed, value }: { seed: string; value: string }) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const key = crypto.createHash("sha256").update(seed).digest();
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    const encrypted = Buffer.concat([cipher.update(value), cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
};

const decrypt = ({ seed, value }: { seed: string; value: string }): string => {
    const [ivHex, encryptedHex] = value.split(":");
    if (!ivHex || !encryptedHex) {
        throw new Error("Invalid encrypted value format");
    }

    const iv = Buffer.from(ivHex, "hex");
    const encryptedText = Buffer.from(encryptedHex, "hex");
    const key = crypto.createHash("sha256").update(seed).digest();
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    return decrypted.toString();
};

const encryption = {
    encrypt,
    decrypt,
};

export default encryption;
