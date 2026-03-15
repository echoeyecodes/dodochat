import { ChatLayout } from "@/features/chat/components/ChatLayout";
import { createFileRoute, Outlet, useParams } from "@tanstack/react-router";
import { GeminiApiKeyDialog } from "@/features/user/components/GeminiApiKeyDialog";
import { VerificationDialog } from "@/features/auth/components/VerificationDialog";

export const Route = createFileRoute("/_main/_auth/_guarded/conversations")({
    component: RouteComponent,
    loader({ context }) {
        return context.user;
    },
});

function RouteComponent() {
    const { id } = useParams({ strict: false }) as { id?: string };
    const user = Route.useLoaderData();

    const isDismissed =
        typeof window !== "undefined"
            ? !!localStorage.getItem("dodochat_gemini_dialog_dismissed")
            : true;

    const handleDialogChange = (open: boolean) => {
        if (!open) {
            localStorage.setItem("dodochat_gemini_dialog_dismissed", "true");
        }
    };

    return (
        <>
            <ChatLayout activeConversationId={id}>
                <Outlet />
            </ChatLayout>
            <VerificationDialog />
            <GeminiApiKeyDialog
                defaultOpen={!user.gemini_api_key && !isDismissed}
                onOpenChange={handleDialogChange}
            />
        </>
    );
}
