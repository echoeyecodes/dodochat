import { createFileRoute } from "@tanstack/react-router";
import { LoginDetail } from "@/features/auth/components/LoginDetail";
import { z } from "zod";

const searchSchema = z.object({
    q: z.string().optional(),
    redirect: z.string().optional(),
});

export const Route = createFileRoute("/_main/_landing/login")({
    validateSearch: searchSchema,
    component: LoginDetail,
});
