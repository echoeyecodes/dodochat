export type MessagePart = {
    type: string;
    text?: string;
    [key: string]: unknown;
};

export type Message = {
    id: string;
    role: 'user' | 'assistant' | 'system';
    parts: MessagePart[];
    created_at: Date;
};

export type ConversationDocument = {
    _id: string;
    title: string;
    messages: Message[];
    created_at: Date;
    updated_at: Date;
};
