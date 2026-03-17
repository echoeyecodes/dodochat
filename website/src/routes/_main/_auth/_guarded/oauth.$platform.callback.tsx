import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { LucideLoader2 } from "lucide-react";
import { connectedAccountsApi } from "@/features/connected-accounts/api";
import { withClientRequestHandler } from "@/lib/request/helpers";

const oauth_callback_search_schema = z.object({
    code: z.string(),
    state: z.string(),
});

const platform_params_schema = z.object({
    platform: z.enum(["spotify", "apple", "youtube"]),
});

export const Route = createFileRoute("/_main/_auth/_guarded/oauth/$platform/callback")({
    params: {
        parse: (params) => platform_params_schema.parse(params),
        stringify: (params) => ({ platform: params.platform }),
    },
    validateSearch: (search) => oauth_callback_search_schema.parse(search),
    loader: async ({ params, location }) => {
        return withClientRequestHandler(async () => {
            const search_params = new URLSearchParams(location.search);
            const code = search_params.get("code")!;
            const state = search_params.get("state")!;

            const { redirect_url } = await connectedAccountsApi.handleCallback({
                provider: params.platform,
                code,
                state,
            });

            throw redirect({ href: redirect_url || "/profile" });
        });
    },
    pendingComponent: OAuthCallbackPending,
    errorComponent: OAuthCallbackError,
});

function OAuthCallbackPending() {
    return (
        <div className="h-dvh w-full flex flex-col items-center justify-center bg-(--color-bg) px-6 font-body">
            <div className="w-full max-w-[440px] flex flex-col items-center text-center animate-in fade-in duration-1000">
                <div className="mb-8 animate-pulse">
                    <img src="/logo.png" alt="DodoChat" className="size-24 object-contain" />
                </div>
                <div className="space-y-4 mb-12 relative w-full">
                    <h2 className="text-[32px] font-bold tracking-tight text-(--color-text-primary)">
                        Connecting Account...
                    </h2>
                    <p className="text-base text-(--color-text-secondary) leading-relaxed">
                        Please wait while we finalize your account connection.
                    </p>
                </div>
                <div className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-(--color-bg-muted) border border-(--color-border-subtle) shadow-sm">
                    <LucideLoader2 className="size-3.5 animate-spin text-(--color-accent)" />
                    <span className="text-[11px] font-bold text-(--color-text-secondary) uppercase tracking-[0.2em] ml-1">
                        Authorizing
                    </span>
                </div>
            </div>
        </div>
    );
}

function OAuthCallbackError() {
    return (
        <div className="h-dvh w-full flex flex-col items-center justify-center bg-(--color-bg) px-6 font-body">
            <div className="w-full max-w-[440px] flex flex-col items-center text-center">
                <h2 className="text-[32px] font-bold tracking-tight text-red-500">
                    Connection Failed
                </h2>
                <p className="text-base text-(--color-text-secondary) leading-relaxed mt-4">
                    Something went wrong during the authorization process. Please try again.
                </p>
                <a
                    href="/profile"
                    className="mt-8 px-6 py-2.5 rounded-full bg-(--color-bg-muted) border border-(--color-border-subtle) text-[13px] font-semibold text-(--color-text-primary) hover:bg-(--color-bg-subtle) transition-colors"
                >
                    Back to Profile
                </a>
            </div>
        </div>
    );
}
