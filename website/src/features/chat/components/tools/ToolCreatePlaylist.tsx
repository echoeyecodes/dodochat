import React, { useEffect, useRef } from "react";
import { type UIMessagePart } from "ai";
import { useChatContext, type ChatTools } from "../../context/ChatContext";
import { useConnectedAccounts } from "../../../connected-accounts/hooks/useConnectedAccounts";
import { LucideMusic, LucideExternalLink, LucideAlertCircle } from "lucide-react";
import {
    ToolCall,
    ToolCallIcon,
    ToolCallMessage,
    ToolCallTrigger,
    ToolCallDetails,
    ToolCallChevron,
} from "./ToolStatus";
import { useLocation } from "@tanstack/react-router";
import { useSelectCurrentUser } from "@/features/user/hooks/useSelectCurrentUser";
type ToolCreatePlaylistPart = Extract<
    UIMessagePart<Record<string, unknown>, ChatTools>,
    { type: "tool-createPlaylist" }
>;

type ToolCreatePlaylistProps = {
    part: ToolCreatePlaylistPart;
};

export const ToolCreatePlaylist: React.FC<ToolCreatePlaylistProps> = ({ part: p }) => {
    const user = useSelectCurrentUser();
    const { data: accounts } = useConnectedAccounts({
        enabled: !!user,
    });
    const isConnected = accounts?.some((acc: { provider: string }) => acc.provider === "spotify");
    const chat = useChatContext();
    const hasResumed = useRef(false);
    const location = useLocation();

    if (p.state === "output-error") {
        return (
            <ToolCall>
                <ToolCallTrigger>
                    <ToolCallChevron />
                    <ToolCallIcon status="error" />
                    <ToolCallMessage className="text-(--color-error)">
                        Could not create playlist.
                    </ToolCallMessage>
                </ToolCallTrigger>
                <ToolCallDetails>{p.errorText}</ToolCallDetails>
            </ToolCall>
        );
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const resumeParam = searchParams.get("resume");

        if (
            p.state === "output-available" &&
            p.output?.status === "requires_auth" &&
            isConnected &&
            resumeParam === "spotify" &&
            !hasResumed.current
        ) {
            hasResumed.current = true;
            chat.regenerate();

            const url = new URL(window.location.href);
            url.searchParams.delete("resume");
            window.history.replaceState({}, "", url.toString());
        }
    }, [isConnected, p.state, p.output, chat]);

    if (p.output && p.output.status === "requires_auth") {
        if (isConnected) {
            return (
                <ToolCall>
                    <div className="flex items-center gap-2.5 text-left w-max">
                        <ToolCallIcon status="loading" />
                        <ToolCallMessage>Account connected! Resuming task...</ToolCallMessage>
                    </div>
                </ToolCall>
            );
        }

        const currentPath = location.pathname;
        const redirect_to = `${currentPath}?resume=spotify`;
        const authUrlWithRedirect = `${p.output.authUrl}?redirect_to=${encodeURIComponent(redirect_to)}`;

        return (
            <div className="flex flex-col my-1.5 animate-in fade-in duration-300 text-[13px] font-mono tracking-tight">
                <div className="flex items-center gap-2.5 text-(--color-warning)">
                    <LucideAlertCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
                    <span>Spotify account not connected.</span>
                </div>
                <div className="pl-6 mt-2 mb-1">
                    <a
                        href={authUrlWithRedirect}
                        className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md bg-(--color-text-primary) text-(--color-bg) text-[11px] font-bold hover:opacity-90 transition-all active:scale-95"
                    >
                        Connect Spotify
                        <LucideExternalLink className="h-3 w-3" />
                    </a>
                </div>
            </div>
        );
    }

    const isDone = p.state === "output-available" && p.output?.success;

    if (!isDone) {
        const isError = p.state === "output-available" && p.output?.success === false;

        return (
            <ToolCall>
                <div className="flex items-center gap-2.5 text-left w-max">
                    <ToolCallIcon status={isError ? "error" : "loading"} />
                    <ToolCallMessage className={isError ? "text-(--color-error)" : ""}>
                        {isError
                            ? p.output?.message || "Failed to create playlist"
                            : p.output?.status === "resuming"
                              ? p.output?.message || "Resuming..."
                              : "Creating playlist..."}
                    </ToolCallMessage>
                </div>
            </ToolCall>
        );
    }

    const { title, thumbnail, songCount, url } = p.output || {};

    return (
        <div className="w-full max-w-[400px] my-5 font-body animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center p-4 rounded-xl border border-(--color-border) bg-(--color-bg-elevated) shadow-xs gap-4 group hover:border-(--color-accent)/30 transition-colors">
                {/* Small Thumbnail */}
                <div className="relative shrink-0 h-16 w-16 rounded-lg bg-(--color-bg-muted) border border-(--color-border-subtle) overflow-hidden shadow-xs">
                    {thumbnail ? (
                        <img src={thumbnail} alt={title} className="h-full w-full object-cover" />
                    ) : (
                        <div className="h-full w-full flex items-center justify-center opacity-20">
                            <LucideMusic className="h-6 w-6 text-(--color-text-tertiary)" />
                        </div>
                    )}
                </div>

                {/* Simple Info */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-bold text-(--color-text-primary) truncate -mb-0.5">
                        {title}
                    </h3>
                    <p className="text-[12px] text-(--color-text-tertiary) font-medium">
                        {songCount} tracks added
                    </p>

                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2.5 inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-(--color-text-primary) text-(--color-bg) text-[11px] font-bold hover:opacity-90 transition-all active:scale-95 group-hover:bg-(--color-accent)"
                    >
                        Listen on Spotify
                        <LucideExternalLink className="h-3 w-3" />
                    </a>
                </div>
            </div>
        </div>
    );
};
