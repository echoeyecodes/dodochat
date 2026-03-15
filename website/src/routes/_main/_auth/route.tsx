import { Layout } from "@/features/common/components/Layout";
import { AuthUserProvider } from "@/features/user/components/AuthUserProvider";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/_auth")({
    component: AuthLayout,
});

function AuthLayout() {
    const { user } = Route.useRouteContext();

    return (
        <AuthUserProvider user={user}>
            <Layout>
                <Outlet />
            </Layout>
        </AuthUserProvider>
    );
}
