import { UserModel } from '../models/User';

type CachedUser = {
    gemini_api_key?: string;
    settings?: {
        should_use_own_gemini_key: boolean;
    };
};

const cache = new Map<string, { data: CachedUser; timestamp: number }>();
const TTL = 1000 * 60 * 5; // 5 minutes cache

export const userSettingsService = {
    async getSettings(userId: string): Promise<CachedUser | null> {
        const cached = cache.get(userId);
        if (cached && (Date.now() - cached.timestamp) < TTL) {
            return cached.data;
        }

        const user = await UserModel.findById(userId).select('gemini_api_key settings').lean();
        if (!user) return null;

        const data = {
            gemini_api_key: user.gemini_api_key,
            settings: user.settings
        };

        cache.set(userId, { data, timestamp: Date.now() });
        return data;
    },

    invalidate(userId: string) {
        cache.delete(userId);
    }
};
