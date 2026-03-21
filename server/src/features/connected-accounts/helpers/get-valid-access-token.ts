import { connectedAccountRepository } from "../repository";
import { spotifyClient } from "@/lib/spotify";
import { connectedAccountNotFoundError } from "../constants/errors";

export const getValidAccessToken = async ({
    userId,
    provider,
}: {
    userId: string;
    provider: "spotify";
}) => {
    const account = await connectedAccountRepository.getAccountByProvider(userId, provider);

    if (!account) {
        throw connectedAccountNotFoundError({
            message: `${provider.charAt(0).toUpperCase() + provider.slice(1)} account not connected. Please connect your account first.`,
        });
    }

    let accessToken = account.access_token;
    const now = Date.now();
    const expiresAt = account.expires_at || 0;

    if (expiresAt > 0 && now >= expiresAt - 60000) {
        if (account.refresh_token) {
            try {
                const tokens = await spotifyClient.refreshUserToken(account.refresh_token);
                accessToken = tokens.access_token;

                await connectedAccountRepository.upsertAccount({
                    user_id: account.user_id,
                    provider,
                    provider_id: account.provider_id,
                    display_name: account.display_name,
                    access_token: tokens.access_token,
                    refresh_token: tokens.refresh_token || account.refresh_token,
                    expires_at: now + tokens.expires_in * 1000,
                });
            } catch (refreshError) {
                console.error(`Failed to refresh ${provider} token:`, refreshError);
            }
        }
    }

    return {
        accessToken,
        account,
    };
};
