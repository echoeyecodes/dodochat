import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { LucideRefreshCw } from "lucide-react";

export const ServerError = () => {
    const handleReset = () => {
        window.location.reload();
    };

    return (
        <div className="h-dvh w-full flex flex-col items-center justify-center bg-(--color-bg) px-6">
            <div className="w-full max-w-[440px] flex flex-col items-center text-center">
                <div>
                    <img src="/logo.png" alt="DodoChat" className="size-32 object-contain" />
                </div>

                <div className="space-y-4 mb-10 relative">
                    <h1 className="text-[120px] font-bold leading-none tracking-tighter text-(--color-text-primary) opacity-[0.03] select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
                        500
                    </h1>
                    <h2 className="text-[32px] font-bold tracking-tight text-(--color-text-primary)">
                        Unexpected error
                    </h2>
                    <p className="text-base text-(--color-text-secondary) leading-relaxed">
                        Something went wrong on our end. We're already looking into it. Try
                        refreshing the page or head back to home.
                    </p>
                </div>

                <div className="w-full flex flex-col gap-3">
                    <Button
                        onClick={handleReset}
                        variant="default"
                        size="lg"
                        roundness="xl"
                        className="w-full h-12 font-semibold shadow-sm shadow-orange-500/10 active:scale-[0.98] transition-all gap-2"
                    >
                        <LucideRefreshCw className="size-4" />
                        Try Again
                    </Button>
                    <Button
                        asChild
                        variant="ghost"
                        size="lg"
                        roundness="xl"
                        className="w-full h-12 font-medium text-(--color-text-tertiary) hover:text-(--color-text-primary) active:scale-[0.98] transition-all"
                    >
                        <Link to="/">Return to Home</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};
