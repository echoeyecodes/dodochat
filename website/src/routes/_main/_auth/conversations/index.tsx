import { createFileRoute } from '@tanstack/react-router'
import { ChatSession } from '@/features/chat/components/ChatSession'
import { Conversation } from '@/features/chat/components/Conversation'

export const Route = createFileRoute('/_main/_auth/conversations/')({
    component: () => (
        <ChatSession>
            <Conversation />
        </ChatSession>
    )
})
