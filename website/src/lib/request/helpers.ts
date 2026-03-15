import { HTTP_STATUS_CODES } from '@/features/common/constants/http-status-codes'
import { notFound, redirect } from '@tanstack/react-router'

export const withClientRequestHandler: <T>(
    callback: () => Promise<T>,
) => Promise<T> = async (callback) => {
    try {
        const response = await callback()
        return response
    } catch (error: any) {
        if (error.code === HTTP_STATUS_CODES.NOT_FOUND) {
            throw notFound()
        }
        if (error.code === HTTP_STATUS_CODES.UNAUTHORIZED) {
            throw redirect({ to: '/login' })
        }
        throw error
    }
}
