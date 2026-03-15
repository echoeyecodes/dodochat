import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { LucideMessageSquareOff } from "lucide-react";

export const ConversationNotFound = () => {
    return (
        <div className="h-dvh w-full flex flex-col items-center justify-center bg-(--color-bg) px-6 relative overflow-hidden">
            <div className="w-full max-w-[440px] flex flex-col items-center text-center">
                <div className="mb-8">
                    <div className="size-24 rounded-3xl bg-(--color-bg-subtle) border border-(--color-border) flex items-center justify-center">
                        <LucideMessageSquareOff className="size-10 text-(--color-text-secondary) opacity-40" />
                    </div>
                </div>

                <div className="space-y-4 mb-10">
                    <h2 className="text-[32px] font-bold tracking-tight text-(--color-text-primary)">
                        Chat not found
                    </h2>
                    <p className="text-base text-(--color-text-secondary) leading-relaxed">
                        This conversation might have been deleted, made private, or the sharing link
                        has expired.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <Button
                        variant="outline"
                        size="lg"
                        roundness="xl"
                        className="flex-1 h-12 font-semibold border-(--color-border) hover:bg-(--color-bg-subtle) active:scale-[0.98] transition-all"
                        onClick={() => window.history.back()}
                    >
                        Go Back
                    </Button>
                    <Button
                        asChild
                        variant="default"
                        size="lg"
                        roundness="xl"
                        className="flex-1 h-12 font-semibold bg-(--color-accent) text-white hover:bg-(--color-accent-hover) active:scale-[0.98] transition-all"
                    >
                        <Link to="/">Home</Link>
                    </Button>
                </div>
            </div>

            <div className="absolute bottom-12 flex items-center gap-2 opacity-30 select-none">
                <img src="/logo.png" alt="" className="size-6 grayscale" />
                <span className="text-xs font-semibold tracking-widest uppercase">DodoChat</span>
            </div>
        </div>
    );
};
