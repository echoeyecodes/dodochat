import { useChatContext } from '../context/ChatContext'

export const ConversationEmptyState = () => {
    const { sendMessage, conversationId } = useChatContext()

    const suggestions = [
        "How do black holes work?",
        "Explain the concept of 'time dilation'.",
        "What is the history of artificial intelligence?",
        "How does photosynthesis actually work?"
    ]

    const handleSuggestionClick = (q: string) => {
        sendMessage({ parts: [{ type: 'text', text: q }] } as any, {
            body: conversationId ? { conversationId } : undefined
        })
    }

    return (
        <div className="flex items-center justify-center h-full">
            <div className="text-center w-full max-w-[500px] px-6">
                <div className="w-12 h-12 rounded-full bg-(--color-bg-muted) flex items-center justify-center mx-auto mb-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-(--color-text-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                </div>
                <p className="text-[14px] text-(--color-text-tertiary) mb-8">Send a message to start the conversation</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-left">
                    {suggestions.map((q) => (
                        <button
                            key={q}
                            onClick={() => handleSuggestionClick(q)}
                            className="px-4 py-3 rounded-xl bg-(--color-bg-subtle) border border-(--color-border) text-[13px] text-(--color-text-secondary) hover:text-(--color-text-primary) hover:border-(--color-text-tertiary)/30 transition-all text-left group"
                        >
                            {q}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
