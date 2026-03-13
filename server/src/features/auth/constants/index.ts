import envConfig from "@/lib/env";

export const ACCESS_TOKEN_SECRET = envConfig.get("ACCESS_TOKEN_SECRET")!;
export const REFRESH_TOKEN_SECRET = envConfig.get("REFRESH_TOKEN_SECRET")!;
export const AUTH_TOKEN_SECRET = envConfig.get("AUTH_TOKEN_SECRET")!
export const ACCESS_TOKEN_EXPIRES_IN = '15m';
export const ACCESS_TOKEN_MAX_AGE = 15 * 60 * 1000; // 15 minutes
export const REFRESH_TOKEN_MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days
