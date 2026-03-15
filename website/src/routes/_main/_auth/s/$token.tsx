import { createFileRoute } from "@tanstack/react-router";
import { ChatSession } from "@/features/chat/components/ChatSession";
import { Conversation } from "@/features/chat/components/Conversation";
import { conversationApi } from "@/features/chat/api";
import { useForkConversation } from "@/features/chat/hooks/useForkConversation";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

import { ConversationNotFound } from "@/features/chat/components/ConversationNotFound";
import { ConversationDetail } from "@/features/chat/types";
import { withClientRequestHandler } from "@/lib/request/helpers";
import { SidebarProvider } from "@/features/chat/context/SidebarContext";
import { FilesSidebarProvider } from "@/features/chat/context/FilesSidebarContext";
import { useSelectCurrentUser } from "@/features/user/hooks/useSelectCurrentUser";

export const Route = createFileRoute("/_main/_auth/s/$token")({
    loader: async ({ params }) => {
        return withClientRequestHandler(async () => {
            const conversation = await conversationApi.fetchSharedConversation(params.token);
            return { conversation };
        });
    },
    component: SharedConversationPage,
    notFoundComponent: ConversationNotFound,
});

function SharedConversationPage() {
    const { conversation } = Route.useLoaderData() as unknown as {
        conversation: ConversationDetail;
    };
    const { token } = Route.useParams();
    const { mutate: fork } = useForkConversation();
    const user = useSelectCurrentUser();
    const navigate = useNavigate();

    const handleFork = () => {
        if (!user) {
            toast.info("Please log in to continue this conversation");
            navigate({ to: "/login", search: { redirect: window.location.pathname } });
            return;
        }
        fork(token);
    };

    return (
        <SidebarProvider>
            <FilesSidebarProvider>
                <ChatSession
                    conversationId={null}
                    initialMessages={conversation.messages}
                    currentConversation={conversation}
                >
                    <Conversation
                        title={conversation.title}
                        isSharedView={true}
                        handleFork={handleFork}
                    />
                </ChatSession>
            </FilesSidebarProvider>
        </SidebarProvider>
    );
}
