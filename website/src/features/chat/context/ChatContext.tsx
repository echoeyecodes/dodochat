import { createContext, useContext, type Dispatch, type SetStateAction } from 'react';
import { type UIMessage, type UseChatHelpers } from '@ai-sdk/react';
import { type UIMessagePart } from 'ai';

export type ChatTools = {
    getSystemInfo: {
        input: {};
        output: {
            node_version: string;
            platform: string;
            arch: string;
            uptime: number;
            memory_usage: {
                rss: string;
                heap_total?: string;
                heap_used: string;
                external?: string;
            };
            cpu_usage?: {
                user: number;
                system: number;
            };
            pid: number;
        };
    };
    applyImageEffect: {
        input: {
            fileId: string;
            effect: 'grayscale' | 'rotate_90' | 'rotate_180' | 'rotate_270' | 'flip' | 'tint_blue' | 'tint_red' | 'tint_green';
        };
        output: {
            success: boolean;
            original_name: string;
            new_file_id: string;
            new_file_url: string;
            message: string;
        };
    };
};

export type FilePart = {
    type: 'file';
    mediaType: string;
    media_type: string;
    url: string;
    file: {
        name: string;
        url: string;
        id: string;
        size?: number;
        metadata?: {
            duration?: number;
            [key: string]: any;
        };
    };
};

// Define the full part union used in this app
export type AppMessagePart = UIMessagePart<Record<string, unknown>, ChatTools> | FilePart;

export type CustomMessage = Omit<UIMessage<{ conversationId?: string }, Record<string, unknown>, ChatTools>, 'parts'> & {
    parts: AppMessagePart[];
};

export type ChatContextType = UseChatHelpers<CustomMessage> & {
    isLoading: boolean;
    input: string;
    setInput: Dispatch<SetStateAction<string>>;
    conversationId?: string | null;
    setConversationId?: (id: string) => void;
};

export const ChatContext = createContext<ChatContextType | null>(null);

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
};
