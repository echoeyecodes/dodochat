import { useState } from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LucideMail, LucideLock, LucideArrowRight, LucideLoader2 } from "lucide-react";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { toast } from "sonner";

import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginDetail = () => {
    const navigate = useNavigate();
    const search = useSearch({ from: "/_main/_landing/login" }) as {
        q?: string;
        redirect?: string;
    };
    const loginMutation = useLogin();
    const [isLoading, setIsLoading] = useState(false);

    const isPending = isLoading || loginMutation.isPending;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (values: LoginFormValues) => {
        setIsLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password,
            );
            const idToken = await userCredential.user.getIdToken();

            loginMutation.mutate(
                { firebase_token: idToken },
                {
                    onSuccess: () => {
                        handleLoginSuccess();
                    },
                    onError: (error: Error) => {
                        setIsLoading(false);
                        return toast.error(error.message);
                    },
                },
            );
        } catch (error: unknown) {
            setIsLoading(false);
            const err = error as Error;
            if (err.message.includes("invalid-credential")) {
                toast.error("Could find an account with this email and password");
                return;
            }
            toast.error(err.message || "Failed to sign in with email");
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            const idToken = await userCredential.user.getIdToken();

            loginMutation.mutate(
                { firebase_token: idToken },
                {
                    onSuccess: () => {
                        handleLoginSuccess();
                    },
                    onError: (error: Error) => {
                        setIsLoading(false);
                        return toast.error(error.message);
                    },
                },
            );
        } catch (error: unknown) {
            setIsLoading(false);
            const err = error as Error;
            toast.error(err.message || "Failed to sign in with Google");
        }
    };

    const handleLoginSuccess = () => {
        if (search.redirect) {
            navigate({ to: search.redirect, reloadDocument: true });
            return;
        }
        navigate({
            to: "/conversations",
            search: search.q ? { q: search.q } : undefined,
            reloadDocument: true,
        });
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 py-20">
            <div className="w-full max-w-md flex flex-col gap-10">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-[100px]">
                        <img
                            src="/logo.png"
                            alt="DodoChat Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <h1 className="text-[32px] font-bold tracking-tight text-(--color-text-primary)">
                        Welcome back
                    </h1>
                    <p className="text-(--color-text-secondary) font-medium">
                        Log in to access your chat brain.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white p-8 md:p-10 rounded-[32px] shadow-(--shadow-editorial) border border-(--color-border-subtle) flex flex-col gap-6"
                >
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-[13px] font-bold text-(--color-text-secondary) ml-1">
                                Email Address
                            </label>
                            <div className="relative group">
                                <LucideMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-(--color-text-tertiary) group-focus-within:text-(--color-accent) transition-colors" />
                                <Input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="pl-11"
                                    {...register("email")}
                                />
                            </div>
                            {errors.email && (
                                <span className="text-[12px] text-red-500 ml-1">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[13px] font-bold text-(--color-text-secondary)">
                                    Password
                                </label>
                            </div>
                            <div className="relative group">
                                <LucideLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-(--color-text-tertiary) group-focus-within:text-(--color-accent) transition-colors" />
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-11"
                                    {...register("password")}
                                />
                            </div>
                            {errors.password && (
                                <span className="text-[12px] text-red-500 ml-1">
                                    {errors.password.message}
                                </span>
                            )}
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
                                Sign In
                                <LucideArrowRight className="w-4 h-4 ml-1" />
                            </>
                        )}
                    </Button>

                    <div className="flex items-center gap-4 py-2">
                        <div className="flex-1 h-px bg-(--color-border-subtle)"></div>
                        <span className="text-[12px] font-bold text-(--color-text-tertiary) uppercase tracking-widest">
                            or
                        </span>
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
                                <img
                                    src="https://www.svgrepo.com/show/355037/google.svg"
                                    className="w-4 h-4 mr-2"
                                    alt="Google"
                                />
                                Continue with Google
                            </>
                        )}
                    </Button>
                </form>

                <p className="text-center text-[14px] text-(--color-text-secondary) font-medium">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-(--color-accent) font-bold hover:underline">
                        Get started
                    </Link>
                </p>
            </div>
        </div>
    );
};
