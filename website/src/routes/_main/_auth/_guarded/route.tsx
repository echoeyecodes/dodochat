import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/_auth/_guarded")({
    component: Outlet,
    beforeLoad: ({ context }) => {
        if (!context.user) throw redirect({ to: "/login" });
        return { user: context.user };
    },
});
