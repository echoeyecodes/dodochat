import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { connectedAccountsApi } from "@/features/connected-accounts/api";
import { withClientRequestHandler } from "@/lib/request/helpers";

const PlatformParamsSchema = z.object({
    platform: z.enum(["spotify", "apple", "youtube"]),
});

export const Route = createFileRoute("/_main/_auth/_guarded/oauth/$platform/connect")({
    params: {
        parse: (params) => PlatformParamsSchema.parse(params),
        stringify: (params) => ({ platform: params.platform }),
    },
    loader: async ({ params }) => {
        return withClientRequestHandler(async () => {
            const auth_url = await connectedAccountsApi.fetchConnectUrl(params.platform);
            throw redirect({
                href: auth_url,
            });
        });
    },
});
