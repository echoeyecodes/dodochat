import type { ConversationDetail, ConversationFile } from "../types";
import { request } from "../../../lib/request";

const fetchConversations = async (): Promise<ConversationDetail[]> => {
    const { data } = await request({ path: "/api/conversations", method: "GET" });
    return (data as { data: ConversationDetail[] }).data;
};

const fetchConversationById = async (id: string): Promise<ConversationDetail> => {
    const { data } = await request({ path: `/api/conversations/${id}`, method: "GET" });
    return (data as { data: ConversationDetail }).data;
};

const deleteConversation = async (id: string): Promise<void> => {
    await request({ path: `/api/conversations/${id}`, method: "DELETE" });
};

const createConversation = async (): Promise<ConversationDetail> => {
    const { data } = await request({ path: "/api/conversations", method: "POST" });
    return (data as { data: ConversationDetail }).data;
};

const updateConversation = async (
    id: string,
    updateData: { title?: string },
): Promise<ConversationDetail> => {
    const { data } = await request({
        path: `/api/conversations/${id}`,
        method: "PATCH",
        body: updateData,
    });
    return (data as { data: ConversationDetail }).data;
};

const searchConversations = async (query: string): Promise<ConversationDetail[]> => {
    const { data } = await request({
        path: "/api/conversations/search",
        method: "GET",
        query: { q: query },
    });
    return (data as { data: ConversationDetail[] }).data;
};

const fetchConversationFiles = async (id: string): Promise<ConversationFile[]> => {
    const { data } = await request({ path: `/api/conversations/${id}/files`, method: "GET" });
    return (data as { data: ConversationFile[] }).data;
};

const toggleConversationSharing = async ({
    id,
    visibility,
}: {
    id: string;
    visibility: "private" | "public";
}): Promise<ConversationDetail> => {
    const { data } = await request({
        path: `/api/conversations/${id}/share`,
        method: "POST",
        body: { visibility },
    });
    return (data as { data: ConversationDetail }).data;
};

const fetchSharedConversation = async (token: string): Promise<ConversationDetail> => {
    const { data } = await request({ path: `/api/conversations/public/${token}`, method: "GET" });
    return (data as { data: ConversationDetail }).data;
};

const forkConversation = async (token: string): Promise<ConversationDetail> => {
    const { data } = await request({
        path: `/api/conversations/public/${token}/fork`,
        method: "POST",
    });
    return (data as { data: ConversationDetail }).data;
};

export const conversationApi = {
    fetchConversations,
    fetchConversationById,
    deleteConversation,
    createConversation,
    updateConversation,
    searchConversations,
    fetchConversationFiles,
    toggleConversationSharing,
    fetchSharedConversation,
    forkConversation,
};
