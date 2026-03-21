import React from "react";
import { type UIMessagePart } from "ai";
import { type ChatTools } from "../../context/ChatContext";
import { LucideMusic, LucideExternalLink, LucideLoader2, LucideAlertCircle } from "lucide-react";

type ToolCreatePlaylistPart = Extract<
    UIMessagePart<Record<string, unknown>, ChatTools>,
    { type: "tool-createPlaylist" }
>;

type ToolCreatePlaylistProps = {
    part: ToolCreatePlaylistPart;
};

export const ToolCreatePlaylist: React.FC<ToolCreatePlaylistProps> = ({ part: p }) => {
    if (p.state === "output-error") {
        return (
            <div className="flex items-center gap-2 p-3 rounded-lg border border-(--color-border) bg-(--color-error-bg) text-(--color-error) my-4 max-w-[400px]">
                <LucideAlertCircle className="h-4 w-4 shrink-0" />
                <span className="text-[12px] font-medium">
                    {p.errorText || "Could not create playlist."}
                </span>
            </div>
        );
    }

    if (p.output && p.output.status === "requires_auth") {
        return (
            <div className="w-full max-w-[400px] my-4 p-4 rounded-xl border border-(--color-border) bg-(--color-bg-elevated) shadow-xs animate-in fade-in duration-300">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <LucideAlertCircle className="h-4 w-4 text-(--color-error)" />
                        <span className="text-[13px] font-medium text-(--color-text-primary)">
                            {p.output.message || "Spotify account not connected."}
                        </span>
                    </div>
                    <a
                        href={p.output.authUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-(--color-text-primary) text-(--color-bg) text-[13px] font-bold hover:opacity-90 transition-all active:scale-95"
                    >
                        Connect Spotify Account
                        <LucideExternalLink className="h-3.5 w-3.5" />
                    </a>
                </div>
            </div>
        );
    }

    const isDone = p.state === "output-available" && p.output?.success;

    if (!isDone) {
        const isError = p.state === "output-available" && p.output?.success === false;

        return (
            <div className="w-full max-w-[400px] my-4 p-4 rounded-xl border border-(--color-border) bg-(--color-bg-elevated) shadow-xs animate-in fade-in duration-300">
                <div className="flex items-center gap-3">
                    {isError ? (
                        <LucideAlertCircle className="h-4 w-4 text-(--color-error)" />
                    ) : (
                        <LucideLoader2 className="h-4 w-4 text-(--color-text-secondary) animate-spin" />
                    )}
                    <span className="text-[13px] font-medium text-(--color-text-primary)">
                        {isError
                            ? p.output?.message
                            : p.output?.status === "resuming"
                              ? p.output?.message
                              : "Creating playlist..."}
                    </span>
                </div>
            </div>
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
