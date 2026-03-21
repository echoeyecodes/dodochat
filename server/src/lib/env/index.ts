import dotenv, { type DotenvConfigOptions } from "dotenv";
dotenv.config();
import { z } from "zod";
const envFile: DotenvConfigOptions | undefined =
    process.env.NODE_ENV === "test" ? { path: ".env.test" } : undefined;

dotenv.config(envFile);

const envSchema = z.object({
    OAUTH_STATE_SECRET: z.string(),
    USER_GEMINI_TOKEN_SECRET: z.string(),
    GOOGLE_GENERATIVE_AI_API_KEY: z.string(),
    MONGODB_URI: z.string(),
    IGDB_CLIENT_ID: z.string(),
    IGDB_CLIENT_SECRET: z.string(),
    ACCESS_TOKEN_SECRET: z.string(),
    REFRESH_TOKEN_SECRET: z.string(),
    AUTH_TOKEN_SECRET: z.string(),
    CDN_URL: z.url(),
    FIREBASE_PROJECT_ID: z.string(),
    FIREBASE_CLIENT_EMAIL: z.string(),
    FIREBASE_PRIVATE_KEY: z.string(),
    STORAGE_PROVIDER: z.string(),
    AWS_S3_BUCKET_NAME: z.string(),
    AWS_S3_ACCESS_KEY_ID: z.string(),
    AWS_S3_SECRET_ACCESS_KEY: z.string(),
    AWS_S3_REGION: z.string(),
    AWS_S3_ENDPOINT: z.url(),
    WEBSITE_URL: z.url(),
    SPOTIFY_CLIENT_ID: z.string(),
    SPOTIFY_CLIENT_SECRET: z.string(),
    SPOTIFY_REDIRECT_URI: z.url(),
    YOUTUBE_API_KEY: z.string(),
    SERVER_PORT: z.coerce.number().default(3001),
    COOKIE_DOMAIN: z.string().optional(),
});

const configs = envSchema.parse(process.env);

const envConfig = {
    get: <K extends keyof typeof configs>(key: K): (typeof configs)[K] => {
        return configs[key];
    },
};

export default envConfig;
