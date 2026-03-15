import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { toast } from "sonner";
import { LucideMail, LucideLoader2, LucideCheckCircle } from "lucide-react";

export const VerificationDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [isChecking, setIsChecking] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                if (!user.emailVerified) {
                    setIsOpen(true);
                } else {
                    setIsOpen(false);
                }
            }
        });

        return () => unsubscribe();
    }, []);

    const handleResendEmail = async () => {
        if (!auth.currentUser) return;

        setIsResending(true);
        try {
            await sendEmailVerification(auth.currentUser);
            toast.success("Verification email sent! Please check your inbox.");
        } catch (error: unknown) {
            const err = error as Error;
            toast.error(err.message || "Failed to resend verification email");
        } finally {
            setIsResending(false);
        }
    };

    const checkVerificationStatus = async () => {
        if (!auth.currentUser) return;

        setIsChecking(true);
        try {
            await auth.currentUser.reload();
            if (auth.currentUser.emailVerified) {
                setIsOpen(false);
                toast.success("Email verified successfully!");
                window.location.reload(); // Reload to ensure everything is synced
            } else {
                toast.error("Account not verified yet. Please check your email.");
            }
        } catch (error: unknown) {
            const err = error as Error;
            toast.error(err.message || "Failed to check verification status");
        } finally {
            setIsChecking(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => {}}>
            <DialogContent className="sm:max-w-[440px] [&>button]:hidden">
                <DialogHeader className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-(--color-accent-subtle) flex items-center justify-center text-(--color-accent) mb-2">
                        <LucideMail className="w-8 h-8" />
                    </div>
                    <DialogTitle className="text-2xl font-bold">Verify your email</DialogTitle>
                    <DialogDescription className="text-[15px] leading-relaxed">
                        We've sent a verification link to{" "}
                        <span className="font-bold text-(--color-text-primary)">
                            {auth.currentUser?.email}
                        </span>
                        . Please click the link in your email to continue.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-3 mt-4">
                    <Button
                        onClick={checkVerificationStatus}
                        size="lg"
                        className="w-full font-bold h-12"
                        disabled={isChecking}
                    >
                        {isChecking ? (
                            <LucideLoader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                            <LucideCheckCircle className="w-4 h-4 mr-2" />
                        )}
                        I've verified my email
                    </Button>

                    <Button
                        variant="outline"
                        onClick={handleResendEmail}
                        size="lg"
                        className="w-full font-bold h-12"
                        disabled={isResending}
                    >
                        {isResending && <LucideLoader2 className="w-4 h-4 animate-spin mr-2" />}
                        Resend email
                    </Button>
                </div>

                <p className="text-center text-[12px] text-(--color-text-tertiary) mt-2">
                    Check your spam folder if you don't see it.
                </p>
            </DialogContent>
        </Dialog>
    );
};
