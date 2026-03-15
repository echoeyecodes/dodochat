import { createFileRoute } from "@tanstack/react-router";
import { SignupDetail } from "@/features/auth/components/SignupDetail";

export const Route = createFileRoute("/_main/_landing/signup")({
    component: SignupDetail,
});
