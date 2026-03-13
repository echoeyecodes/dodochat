import { request } from '@/lib/request'
import { User } from '@/features/user/types'
import { AuthToken } from '../types';

export type AuthResponse = {
    user: User;
};

const login = async (params: { email?: string; password?: string; firebase_token?: string }): Promise<AuthToken> => {
    const { data } = await request({
        path: 'api/auth/login',
        method: 'POST',
        body: params,
    });
    return data.data;
};

const signup = async (params: { email: string; password: string; display_name: string }): Promise<AuthToken> => {
    const { data } = await request({
        path: 'api/auth/signup',
        method: 'POST',
        body: params,
    });
    return data.data;
};

const logout = async (): Promise<void> => {
    await request({
        path: 'api/auth/logout',
        method: 'POST',
    });
};

const refreshToken = async (): Promise<{ access_token: string; refresh_token: string; access_token_expires_at: string }> => {
    const { data } = await request({
        path: 'api/auth/refresh-token',
        method: 'POST',
    });
    return data.data;
};

export const authApi = {
    login,
    signup,
    logout,
    refreshToken,
};
