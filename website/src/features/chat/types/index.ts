export type MessagePart = {
  type: 'text';
  text: string;
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
  created_at: string;
}
