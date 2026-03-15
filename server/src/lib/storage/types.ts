export interface StorageProvider {
    upload(params: { key: string; body: Buffer; contentType: string }): Promise<string>;

    get(key: string): Promise<Buffer>;

    delete(key: string): Promise<void>;
}
