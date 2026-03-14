import encryption from '@/lib/encryption';
import { USER_GEMINI_TOKEN_SECRET } from '../constants';

export const safeDecryptGeminiKey = (encryptedKey: string): string => {

    try {
        return encryption.decrypt({
            seed: USER_GEMINI_TOKEN_SECRET,
            value: encryptedKey
        });
    } catch (error) {
        console.error('Failed to decrypt gemini_api_key:', error);
        return encryptedKey;
    }
};
