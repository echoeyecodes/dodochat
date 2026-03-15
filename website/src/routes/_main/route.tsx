import { withClientRequestHandler } from "@/lib/request/helpers";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { currentUserQueryOptions } from "@/features/user/hooks/queries";
import { ErrorBody } from "@/lib/request/ErrorBody";
import { HTTP_STATUS_CODES } from "@/features/common/constants/http-status-codes";

export const Route = createFileRoute("/_main")({
    component: RouteComponent,
    beforeLoad: async ({ context }) => {
        const user = await withClientRequestHandler(async () => {
            return context.queryClient.ensureQueryData(currentUserQueryOptions()).catch((error) => {
                if (error instanceof ErrorBody && error.code === HTTP_STATUS_CODES.UNAUTHORIZED) {
                    return null;
                }
                throw error;
            });
        });
        return { user };
    },
});

function RouteComponent() {
    return <Outlet />;
}
