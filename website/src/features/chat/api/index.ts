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

type MusicResolveResult = {
    link: string;
    platform: "apple" | "spotify" | "youtube";
};
export const musicApi = {
    resolveLink: async ({
        query,
        platform,
    }: {
        query: string;
        platform: "apple" | "spotify" | "youtube";
    }): Promise<MusicResolveResult> => {
        const { data } = await request({
            path: "/api/music/resolve",
            method: "GET",
            query: { query, platform },
        });
        return (data as { data: MusicResolveResult }).data;
    },
    createPlaylist: async ({
        name,
        songs,
    }: {
        name?: string;
        songs: { title: string; artist: string; isrc?: string }[];
    }): Promise<{ url: string; message: string }> => {
        const { data } = await request({
            path: "/api/music/playlist",
            method: "POST",
            body: { name, songs },
        });
        return data as { url: string; message: string };
    },
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
