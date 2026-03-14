import { request } from '@/lib/request'
import { User } from '@/features/user/types'

const fetchCurrentUser = async (): Promise<User> => {
    const { data } = await request({
        path: 'api/users/me',
        method: 'GET',
    })
    return data.data
}

const updateProfile = async (params: { gemini_api_key?: string; settings?: { should_use_own_gemini_key: boolean } }): Promise<User> => {
    const { data } = await request({
        path: 'api/users/me',
        method: 'PUT',
        body: params,
    })
    return data.data
}

export const userApi = {
    fetchCurrentUser,
    updateProfile,
}
