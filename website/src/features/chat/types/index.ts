export type MessagePart = {
  type: 'text';
  text: string;
} | {
  type: 'file';
  file: {
    id: string;
    name: string;
    url: string;
    size?: number;
    metadata?: {
      duration?: number;
      [key: string]: any;
    };
  };
  media_type?: string;
} | {
  type: 'image';
  image: string;
  media_type?: string;
}

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  parts: MessagePart[];
  created_at?: string;
}

export type ConversationDetail = {
  _id: string;
  title: string;
  preview?: string;
  messages: ChatMessage[];
  created_at: string;
  updated_at: string;
}

export type ConversationFile = {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  metadata?: {
    duration?: number;
    [key: string]: any;
  };
  created_at: string;
}
