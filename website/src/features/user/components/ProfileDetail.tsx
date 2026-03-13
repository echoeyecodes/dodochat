import { useSelectCurrentUser } from '@/features/user/hooks/useSelectCurrentUser'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LucideArrowLeft, LucideEye, LucideEyeOff, LucideKey, LucideMail, LucideUser, LucideLoader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useUpdateProfile } from '../hooks/useUpdateProfile'
import { toast } from 'sonner'

const profileSchema = z.object({
    gemini_api_key: z.string().min(1, 'API key is required'),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export const ProfileDetail = () => {
    const user = useSelectCurrentUser()
    const [showApiKey, setShowApiKey] = useState(false)
    const { mutate: updateProfile, isPending } = useUpdateProfile()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            gemini_api_key: user?.gemini_api_key || '',
        },
    })

    useEffect(() => {
        if (user) {
            reset({
                gemini_api_key: user.gemini_api_key || '',
            })
        }
    }, [user, reset])

    const onSubmit = (data: ProfileFormValues) => {
        updateProfile(data, {
            onSuccess: () => {
                toast.success('Profile updated successfully')
                reset(data)
            },
            onError: (error: any) => {
                toast.error(error.message || 'Failed to update profile')
            }
        })
    }

    const initials = user?.display_name
        ? user.display_name.substring(0, 2).toUpperCase()
        : user?.email?.substring(0, 2).toUpperCase() || '??'

    return (
        <div className="flex-1 flex items-start justify-center overflow-y-auto py-8 px-4">
            <div className="w-full max-w-lg space-y-8">
                {/* Back link */}
                <Link
                    to="/conversations" className="inline-flex items-center gap-2 text-[13px] text-(--color-text-tertiary) hover:text-(--color-text-primary) transition-colors"
                >
                    <LucideArrowLeft className="h-3.5 w-3.5" />
                    Back to chats
                </Link>

                {/* Header */}
                <div className="flex items-center gap-5">
                    <div className="h-16 w-16 rounded-2xl border border-(--color-border) bg-(--color-bg-elevated) flex items-center justify-center text-xl font-semibold text-(--color-text-primary) shadow-sm shrink-0">
                        {initials}
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-(--color-text-primary) tracking-tight">
                            Profile
                        </h1>
                        <p className="text-[13px] text-(--color-text-tertiary) mt-0.5">
                            Manage your account settings
                        </p>
                    </div>
                </div>

                {/* Account info section */}
                <section className="rounded-xl border border-(--color-border) bg-(--color-bg-elevated) overflow-hidden">
                    <div className="px-5 py-4 border-b border-(--color-border)">
                        <h2 className="text-[13px] font-semibold text-(--color-text-primary) uppercase tracking-wider">
                            Account
                        </h2>
                    </div>

                    <div className="divide-y divide-(--color-border)">
                        {/* Name */}
                        <div className="px-5 py-4 flex items-center gap-4">
                            <div className="h-9 w-9 rounded-lg bg-(--color-bg-subtle) flex items-center justify-center shrink-0">
                                <LucideUser className="h-4 w-4 text-(--color-text-tertiary)" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-[11px] font-medium text-(--color-text-tertiary) uppercase tracking-wider mb-0.5">
                                    Name
                                </p>
                                <p className="text-[14px] text-(--color-text-primary) truncate">
                                    {user?.display_name || '—'}
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="px-5 py-4 flex items-center gap-4">
                            <div className="h-9 w-9 rounded-lg bg-(--color-bg-subtle) flex items-center justify-center shrink-0">
                                <LucideMail className="h-4 w-4 text-(--color-text-tertiary)" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-[11px] font-medium text-(--color-text-tertiary) uppercase tracking-wider mb-0.5">
                                    Email
                                </p>
                                <p className="text-[14px] text-(--color-text-primary) truncate">
                                    {user?.email || '—'}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* API Key section */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <section className="rounded-xl border border-(--color-border) bg-(--color-bg-elevated) overflow-hidden">
                        <div className="px-5 py-4 border-b border-(--color-border)">
                            <h2 className="text-[13px] font-semibold text-(--color-text-primary) uppercase tracking-wider">
                                API Configuration
                            </h2>
                        </div>

                        <div className="px-5 py-5 space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="h-9 w-9 rounded-lg bg-(--color-accent-subtle) flex items-center justify-center shrink-0 mt-0.5">
                                    <LucideKey className="h-4 w-4 text-(--color-accent)" />
                                </div>
                                <div className="flex-1 min-w-0 space-y-3">
                                    <div>
                                        <p className="text-[11px] font-medium text-(--color-text-tertiary) uppercase tracking-wider mb-0.5">
                                            Gemini API Key
                                        </p>
                                        <p className="text-[12px] text-(--color-text-tertiary) leading-relaxed">
                                            Your API key is used to authenticate with Google's Gemini API. It is stored securely and never shared.
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <Input
                                                    id="gemini-api-key"
                                                    type={showApiKey ? 'text' : 'password'}
                                                    {...register('gemini_api_key')}
                                                    placeholder="AIza..."
                                                    className="h-10 pr-10 text-[13px] font-mono bg-(--color-bg) border-(--color-border)"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowApiKey(!showApiKey)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-(--color-text-tertiary) hover:text-(--color-text-primary) transition-colors"
                                                >
                                                    {showApiKey ? (
                                                        <LucideEyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <LucideEye className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>
                                            <Button
                                                type="submit"
                                                size="sm"
                                                className="h-10 px-5 text-[13px]"
                                                disabled={isPending || !isDirty}
                                            >
                                                {isPending ? (
                                                    <>
                                                        <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Saving...
                                                    </>
                                                ) : (
                                                    'Save'
                                                )}
                                            </Button>
                                        </div>
                                        {errors.gemini_api_key && (
                                            <p className="text-[11px] text-red-500 font-medium">
                                                {errors.gemini_api_key.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    )
}
