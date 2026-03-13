import { useMemo, useState, useCallback, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { ChatContext, type CustomMessage } from '../context/ChatContext';
import { ChatTextArea } from './ChatTextArea';
import { useNavigate } from '@tanstack/react-router';
import { useInvalidateConversations } from '../hooks/useInvalidateConversations';
import { type ChatMessage } from '../types';
import envConfig from '@/lib/env';

type ChatSessionProps = {
    conversationId?: string | null;
    initialMessages?: ChatMessage[];
    children: React.ReactNode;
};

export const ChatSession = ({ conversationId, initialMessages = [], children }: ChatSessionProps) => {
    const navigate = useNavigate();
    const invalidateConversations = useInvalidateConversations();

    const handleConversationCreated = useCallback(
        (id: string) => {
            invalidateConversations();
            if (id && id !== 'refresh') {
                navigate({ to: '/conversations/$id', params: { id } });
            }
        },
        [invalidateConversations, navigate]
    );

    const [input, setInput] = useState('');
    const [activeId, setActiveId] = useState<string | null>(conversationId || null);

    // Sync activeId with conversationId prop when it changes (e.g. from route)
    useEffect(() => {
        setActiveId(conversationId || null);
    }, [conversationId]);

    const transport = useMemo(
        () => new DefaultChatTransport({
            api: `${envConfig.get("BASE_API_URL")}/api/conversations/chat`,
            body: activeId ? { conversationId: activeId } : undefined,
        }),
        [activeId]
    );

    const chatData = useChat<CustomMessage>({
        transport,
        messages: initialMessages.length > 0 ? (initialMessages as CustomMessage[]) : undefined,
        onFinish: ({ message }) => {
            if (!conversationId && handleConversationCreated) {
                const id = message.metadata?.conversationId;
                if (id) {
                    handleConversationCreated(id);
                }
            }
        },
    });

    const isLoadingStatus = chatData.status === 'streaming' || chatData.status === 'submitted';

    return (
        <ChatContext.Provider value={{
            ...chatData,
            isLoading: isLoadingStatus,
            input,
            setInput,
            conversationId: activeId,
            setConversationId: setActiveId
        }}>
            <div className="flex-1 flex flex-col relative w-full h-full overflow-hidden bg-(--color-bg-elevated)">
                {children}
                <ChatTextArea />
            </div>
        </ChatContext.Provider>
    );
};
