import { authRepository } from "../repository/index";

type CachedAuthToken = {
    access_token_expires_at: Date;
    user_id: string;
};

const cache = new Map<string, { data: CachedAuthToken; timestamp: number }>();
// const TTL = 1000 * 60 * 5; // 5 minutes cache

export const authCache = {
    async getAuthToken(hashedToken: string): Promise<CachedAuthToken | null> {
        // const cached = cache.get(hashedToken);
        // if (cached && Date.now() - cached.timestamp < TTL) {
        //     return cached.data;
        // }

        try {
            const authToken = await authRepository.getAuthToken({ access_token: hashedToken });

            const data = {
                access_token_expires_at: authToken.access_token_expires_at,
                user_id: authToken.user_id.toString(),
            };

            cache.set(hashedToken, { data, timestamp: Date.now() });
            return data;
        } catch {
            return null;
        }
    },

    invalidate(hashedToken: string) {
        cache.delete(hashedToken);
    },
};
