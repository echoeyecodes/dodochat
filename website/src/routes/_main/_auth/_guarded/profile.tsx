import { createFileRoute } from "@tanstack/react-router";
import { ProfileDetail } from "@/features/user/components/ProfileDetail";

export const Route = createFileRoute("/_main/_auth/_guarded/profile")({
    component: ProfileDetail,
});
