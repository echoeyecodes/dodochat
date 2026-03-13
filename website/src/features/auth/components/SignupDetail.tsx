import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LucideMail, LucideLock, LucideUser, LucideArrowRight, LucideLoader2 } from 'lucide-react'
import { useLogin } from '@/features/auth/hooks/useLogin'
import { toast } from 'sonner'

import { signInWithPopup, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase'

const signupSchema = z.object({
    display_name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

type SignupFormValues = z.infer<typeof signupSchema>

export const SignupDetail = () => {
    const navigate = useNavigate()
    const loginMutation = useLogin()
    const [isLoading, setIsLoading] = useState(false)

    const isPending = isLoading || loginMutation.isPending

    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
    })

    const onSubmit = async (values: SignupFormValues) => {
        setIsLoading(true)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password)

            await sendEmailVerification(userCredential.user)
            toast.success('Verification email sent! Please check your inbox.')

            await updateProfile(userCredential.user, {
                displayName: values.display_name
            })

            const idToken = await userCredential.user.getIdToken()

            loginMutation.mutate({ firebase_token: idToken }, {
                onSuccess: () => {
                    navigate({ to: '/conversations', reloadDocument: true })
                },
                onError: (error: Error) => {
                    setIsLoading(false)
                    return toast.error(error.message)
                },
            })
        } catch (error: any) {
            setIsLoading(false)
            if (error.message.includes('already-in-use')) {
                toast.error('Email already in use')
                return
            }
            toast.error(error.message || 'Failed to create account')
        }
    }

    const handleGoogleLogin = async () => {
        setIsLoading(true)
        try {
            const userCredential = await signInWithPopup(auth, googleProvider)
            const idToken = await userCredential.user.getIdToken()

            loginMutation.mutate({ firebase_token: idToken }, {
                onSuccess: () => {
                    navigate({ to: '/conversations', reloadDocument: true })
                },
                onError: (error: Error) => {
                    setIsLoading(false)
                    return toast.error(error.message)
                },
            })
        } catch (error: any) {
            setIsLoading(false)
            toast.error(error.message || 'Failed to sign in with Google')
        }
    }

    return (
        <div className="flex flex-col items-center justify-center p-6 py-20 bg-linear-to-b from-white to-(--color-bg-subtle)">
            <div className="w-full max-w-md flex flex-col gap-10">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-(--color-accent) flex items-center justify-center text-white font-bold text-3xl shadow-xl -rotate-3 mb-2">G</div>
                    <h1 className="text-[32px] font-bold tracking-tight text-(--color-text-primary)">Create account</h1>
                    <p className="text-(--color-text-secondary) font-medium">Join the next generation of chat.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 md:p-10 rounded-[32px] shadow-(--shadow-editorial) border border-(--color-border-subtle) flex flex-col gap-6">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-[13px] font-bold text-(--color-text-secondary) ml-1">Full Name</label>
                            <div className="relative group">
                                <LucideUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-(--color-text-tertiary) group-focus-within:text-(--color-accent) transition-colors" />
                                <Input
                                    placeholder="John Doe"
                                    className="pl-11"
                                    {...register('display_name')}
                                />
                            </div>
                            {errors.display_name && <span className="text-[12px] text-red-500 ml-1">{errors.display_name.message}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[13px] font-bold text-(--color-text-secondary) ml-1">Email Address</label>
                            <div className="relative group">
                                <LucideMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-(--color-text-tertiary) group-focus-within:text-(--color-accent) transition-colors" />
                                <Input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="pl-11"
                                    {...register('email')}
                                />
                            </div>
                            {errors.email && <span className="text-[12px] text-red-500 ml-1">{errors.email.message}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[13px] font-bold text-(--color-text-secondary) ml-1">Password</label>
                            <div className="relative group">
                                <LucideLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-(--color-text-tertiary) group-focus-within:text-(--color-accent) transition-colors" />
                                <Input
                                    type="password"
                                    placeholder="Min. 6 characters"
                                    className="pl-11"
                                    {...register('password')}
                                />
                            </div>
                            {errors.password && <span className="text-[12px] text-red-500 ml-1">{errors.password.message}</span>}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        size="lg"
                        roundness="xl"
                        className="w-full h-14 text-[16px] font-bold mt-2 shadow-lg shadow-orange-500/20"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <LucideLoader2 className="w-4 h-4 animate-spin mr-2" />
                                Processing...
                            </>
                        ) : (
                            <>
                                Create Account
                                <LucideArrowRight className="w-4 h-4 ml-1" />
                            </>
                        )}
                    </Button>

                    <div className="flex items-center gap-4 py-2">
                        <div className="flex-1 h-px bg-(--color-border-subtle)"></div>
                        <span className="text-[12px] font-bold text-(--color-text-tertiary) uppercase tracking-widest">or</span>
                        <div className="flex-1 h-px bg-(--color-border-subtle)"></div>
                    </div>

                    <Button
                        variant="outline"
                        type="button"
                        size="lg"
                        roundness="xl"
                        className="w-full h-14 text-[15px] font-bold border-(--color-border-subtle)"
                        onClick={handleGoogleLogin}
                        disabled={isPending}
                    >
                        {isPending ? (
                            <LucideLoader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-4 h-4 mr-2" alt="Google" />
                                Continue with Google
                            </>
                        )}
                    </Button>
                </form>

                <p className="text-center text-[14px] text-(--color-text-secondary) font-medium">
                    Already have an account? <Link to="/login" className="text-(--color-accent) font-bold hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    )
}
