import type { StorageProvider } from "./types";
import aws from "aws-sdk";
import envConfig from "../env";

export class S3StorageProvider implements StorageProvider {
    private s3: aws.S3;
    private bucket: string;

    constructor() {
        this.bucket = envConfig.get("AWS_S3_BUCKET_NAME")!;
        this.s3 = new aws.S3({
            region: envConfig.get("AWS_S3_REGION"),
            endpoint: envConfig.get("AWS_S3_ENDPOINT"),
            credentials: {
                accessKeyId: envConfig.get("AWS_S3_ACCESS_KEY_ID")!,
                secretAccessKey: envConfig.get("AWS_S3_SECRET_ACCESS_KEY")!,
            },
            s3ForcePathStyle: process.env.AWS_S3_FORCE_PATH_STYLE === "true",
        });
    }

    async upload(params: { key: string; body: Buffer; contentType: string }): Promise<string> {
        await this.s3
            .upload({
                Bucket: this.bucket,
                Key: params.key,
                Body: params.body,
                ContentType: params.contentType,
            })
            .promise();
        return params.key;
    }

    async get(key: string): Promise<Buffer> {
        const data = await this.s3
            .getObject({
                Bucket: this.bucket,
                Key: key,
            })
            .promise();
        return data.Body as Buffer;
    }

    async delete(key: string): Promise<void> {
        await this.s3
            .deleteObject({
                Bucket: this.bucket,
                Key: key,
            })
            .promise();
    }
}
