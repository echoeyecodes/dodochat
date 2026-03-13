import { createFileRoute } from '@tanstack/react-router'
import { ConversationLoading } from '@/features/chat/components/ConversationLoading'
import { Conversation } from '@/features/chat/components/Conversation'
import { ChatSession } from '@/features/chat/components/ChatSession'
import { conversationApi } from '@/features/chat/api'
import { withClientRequestHandler } from '@/lib/request/helpers'

export const Route = createFileRoute('/_main/_auth/conversations/$id/')({
    pendingComponent: ConversationLoading,
    component: ConversationRoute,
    loader: async ({ params }) => {
        const { id } = params
        return withClientRequestHandler(() => conversationApi.fetchConversationById(id))
    },
    head: ({ loaderData }) => {
        if (!loaderData) return {}

        const title = loaderData.title
        const description = 'Chat intelligently with DodoChat. Your versatile AI assistant for every task.'

        return {
            meta: [
                { title },
                { name: 'description', content: description },
                { property: 'og:title', content: title },
                { property: 'og:description', content: description },
                { property: 'og:type', content: 'article' },
                { property: 'og:site_name', content: 'DodoChat' },
                { name: 'twitter:card', content: 'summary' },
                { name: 'twitter:title', content: title },
                { name: 'twitter:description', content: description },
            ],
        }
    }
})

function ConversationRoute() {
    const conversation = Route.useLoaderData()

    return (
        <ChatSession
            key={conversation._id}
            conversationId={conversation._id}
            initialMessages={conversation.messages}
        >
            <Conversation title={conversation.title} />
        </ChatSession>
    )
}
