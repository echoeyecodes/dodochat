import { createFileRoute } from '@tanstack/react-router'
import { ChatSession } from '@/features/chat/components/ChatSession'
import { Conversation } from '@/features/chat/components/Conversation'
import { ConversationSessionSkeleton } from '@/features/chat/components/ConversationSessionSkeleton'
import { z } from 'zod'

const searchSchema = z.object({
    q: z.string().optional(),
})

export const Route = createFileRoute('/_main/_auth/_guarded/conversations/')({
    validateSearch: searchSchema,
    pendingComponent: ConversationSessionSkeleton,
    component: RouteComponent,
})

function RouteComponent() {
    const { q } = Route.useSearch()

    return (
        <ChatSession initialQuery={q}>
            <Conversation />
        </ChatSession>
    )
}
