import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { z } from "zod";
import { LucideLoader2 } from "lucide-react";
import { musicApi } from "@/features/chat/api";
import { withClientRequestHandler } from "@/lib/request/helpers";
import { Button } from "@/components/ui/button";

const resolveSearchSchema = z.object({
    query: z.string(),
    platform: z.enum(["apple", "spotify", "youtube"]),
});

export const Route = createFileRoute("/music/resolve")({
    validateSearch: resolveSearchSchema,
    loader: async ({ location }) => {
        return withClientRequestHandler(async () => {
            const searchParams = new URLSearchParams(location.search);
            const query = searchParams.get("query")!;
            const platform = searchParams.get("platform") as "apple" | "spotify" | "youtube";

            const { link } = await musicApi.resolveLink({
                query,
                platform,
            });
            throw redirect({ href: link });
        });
    },
    errorComponent: MusicResolveError,
    pendingComponent: MusicResolvePage,
});

function MusicResolveError() {
    return (
        <div className="h-dvh w-full flex flex-col items-center justify-center bg-(--color-bg) px-6 font-body selection:bg-(--color-accent)/30">
            <div className="w-full max-w-[440px] flex flex-col items-center text-center animate-in fade-in duration-700">
                <div className="mb-8">
                    <img
                        src="/logo.png"
                        alt="DodoChat"
                        className="size-24 object-contain opacity-20 grayscale"
                    />
                </div>

                <div className="space-y-4 mb-12 relative w-full">
                    <h1 className="text-[140px] font-bold leading-none tracking-tighter text-(--color-text-primary) opacity-[0.03] select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
                        OFF
                    </h1>
                    <h2 className="text-[32px] font-bold tracking-tight text-(--color-text-primary)">
                        Resolution Failed
                    </h2>
                    <p className="text-base text-(--color-text-secondary) leading-relaxed text-pretty">
                        We couldn't connect this track to the requested platform. It might be
                        missing from their library or currently unavailable.
                    </p>
                </div>

                <div className="w-full flex flex-col gap-3">
                    <Button
                        onClick={() => window.location.reload()}
                        variant="default"
                        size="lg"
                        roundness="xl"
                        className="w-full h-12 font-semibold shadow-sm active:scale-[0.98] transition-all gap-2"
                    >
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
}

function MusicResolvePage() {
    const { platform } = Route.useSearch();

    return (
        <div className="h-dvh w-full flex flex-col items-center justify-center bg-(--color-bg) px-6 font-body">
            <div className="w-full max-w-[440px] flex flex-col items-center text-center animate-in fade-in duration-1000">
                <div className="mb-8 animate-pulse">
                    <img src="/logo.png" alt="DodoChat" className="size-24 object-contain" />
                </div>

                <div className="space-y-4 mb-12 relative w-full">
                    <h1 className="text-[140px] font-bold leading-none text-(--color-text-primary) opacity-[0.03] select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 uppercase tracking-[-0.05em]">
                        {platform}
                    </h1>
                    <h2 className="text-[32px] font-bold tracking-tight text-(--color-text-primary)">
                        Connecting...
                    </h2>
                    <p className="text-base text-(--color-text-secondary) leading-relaxed">
                        Hold on while we secure the best link for you on{" "}
                        {platform.charAt(0).toUpperCase() + platform.slice(1)} Music.
                    </p>
                </div>

                <div className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-(--color-bg-muted) border border-(--color-border-subtle) shadow-sm">
                    <LucideLoader2 className="size-3.5 animate-spin text-(--color-accent)" />
                    <span className="text-[11px] font-bold text-(--color-text-secondary) uppercase tracking-[0.2em] ml-1">
                        Resolving
                    </span>
                </div>
            </div>
        </div>
    );
}
