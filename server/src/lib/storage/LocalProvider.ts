import type { StorageProvider } from './types';
import fs from 'node:fs/promises';
import path from 'path';
import { existsSync, mkdirSync } from 'node:fs';

export class LocalStorageProvider implements StorageProvider {
    private baseDir: string;

    constructor() {
        this.baseDir = path.resolve(process.cwd(), 'uploads');
        if (!existsSync(this.baseDir)) {
            mkdirSync(this.baseDir, { recursive: true });
        }
    }

    async upload(params: { key: string; body: Buffer; contentType: string }): Promise<string> {
        const filename = params.key.replace(/^uploads\//, '');
        const filePath = path.join(this.baseDir, filename);

        const dir = path.dirname(filePath);
        if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
        }

        await fs.writeFile(filePath, params.body);
        return params.key;
    }

    async get(key: string): Promise<Buffer> {
        const filename = key.replace(/^uploads\//, '');
        const filePath = path.join(this.baseDir, filename);
        return await fs.readFile(filePath);
    }

    async delete(key: string): Promise<void> {
        const filename = key.replace(/^uploads\//, '');
        const filePath = path.join(this.baseDir, filename);
        try {
            await fs.unlink(filePath);
        } catch (err) {
            console.error(`LocalStorageProvider: Failed to delete ${filePath}`, err);
        }
    }
}
