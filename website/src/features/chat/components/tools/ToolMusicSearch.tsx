import React from "react";
import { type UIMessagePart } from "ai";
import { type ChatTools } from "../../context/ChatContext";
import {
    LucideMusic,
    LucideDisc,
    LucidePlus,
} from "lucide-react";
import { useChatContext } from "../../context/ChatContext";
import { ToolCall, ToolCallIcon, ToolCallMessage, ToolCallTrigger, ToolCallDetails, ToolCallChevron } from "./ToolStatus";
import { SpotifyIcon } from "../../../common/components/icons/SpotifyIcon";
import { AppleMusicIcon } from "../../../common/components/icons/AppleMusicIcon";
import { YoutubeMusicIcon } from "../../../common/components/icons/YoutubeMusicIcon";

type ToolMusicSearchPart = Extract<
    UIMessagePart<Record<string, unknown>, ChatTools>,
    { type: "tool-randomSongs" }
>;

type ToolMusicSearchProps = {
    part: ToolMusicSearchPart;
};

const getCoverArtUrl = (releaseId?: string) => {
    if (!releaseId) return null;
    return `https://coverartarchive.org/release/${releaseId}/front-250.jpg`;
};

export const ToolMusicSearch: React.FC<ToolMusicSearchProps> = ({ part: p }) => {
    const chat = useChatContext();

    const handleCreatePlaylist = async () => {
        if (p.state !== "output-available" || !p.output?.songs || p.output.songs.length === 0)
            return;
        chat.sendMessage({
            parts: [{ type: "text", text: "Create a Spotify playlist for me with these songs." }],
        });
    };

    if ("errorText" in p && p.errorText) {
        return (
            <ToolCall>
                <ToolCallTrigger>
                    <ToolCallChevron />
                    <ToolCallIcon status="error" />
                    <ToolCallMessage className="text-(--color-error)">Could not retrieve music facts.</ToolCallMessage>
                </ToolCallTrigger>
                <ToolCallDetails>{p.errorText}</ToolCallDetails>
            </ToolCall>
        );
    }

    const isLoading = p.state !== "output-available";

    if (isLoading) {
        return (
            <ToolCall>
                <div className="flex items-center gap-2.5 text-left w-max">
                    <ToolCallIcon status="loading" />
                    <ToolCallMessage>Searching for music...</ToolCallMessage>
                </div>
            </ToolCall>
        );
    }

    return (
        <div className="w-full max-w-[500px] my-5 font-body">
            {/* Minimal Header */}
            <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                    <LucideMusic className="h-4 w-4 text-(--color-text-secondary)" />
                    <span className="text-[13px] font-bold text-(--color-text-primary)">
                        Found {p.state === "output-available" ? p.output?.songs?.length : ""} Songs
                    </span>
                </div>

                {p.state === "output-available" && p.output?.songs && p.output.songs.length > 0 && (
                    <button
                        onClick={handleCreatePlaylist}
                        disabled={chat.isLoading}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-(--color-text-primary) text-(--color-bg) text-[11px] font-bold hover:opacity-90 disabled:opacity-40 transition-all active:scale-95 group/btn"
                    >
                        {chat.isLoading ? (
                            <ToolCallIcon status="loading" className="h-3 w-3" />
                        ) : (
                            <LucidePlus className="h-3 w-3" />
                        )}
                        <span>Save to Spotify</span>
                    </button>
                )}
            </div>

            <div className="border border-(--color-border) rounded-xl bg-(--color-bg-elevated) shadow-xs overflow-hidden">
                <div className="divide-y divide-(--color-border-subtle)">
                    {p.state === "output-available" && p.output?.songs && (
                        p.output.songs.length > 0 ? (
                            p.output.songs.map((song, i) => {
                                const coverUrl = getCoverArtUrl(song.releaseId);

                                return (
                                    <div
                                        key={song.id || i}
                                        className="group flex items-center gap-4 p-3.5 hover:bg-(--color-bg-subtle) transition-all duration-200"
                                    >
                                        <div className="relative shrink-0 h-9 w-9 rounded-md bg-(--color-bg-muted) border border-(--color-border-subtle) overflow-hidden">
                                            {coverUrl ? (
                                                <img
                                                    src={coverUrl}
                                                    alt=""
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center opacity-20">
                                                    <LucideDisc className="h-4 w-4" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-3">
                                                <h4 className="text-[14px] font-bold text-(--color-text-primary) truncate">
                                                    {song.title}
                                                </h4>
                                                {song.duration && (
                                                    <span className="text-[11px] font-mono font-medium text-(--color-text-tertiary) opacity-70">
                                                        {Math.floor(song.duration / 60000)}:
                                                        {((song.duration % 60000) / 1000)
                                                            .toFixed(0)
                                                            .padStart(2, "0")}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2 text-[12px] font-medium text-(--color-text-secondary)">
                                                <span className="truncate">{song.artist}</span>
                                                {song.date && (
                                                    <span className="opacity-60 text-(--color-text-quaternary)">
                                                        • {song.date.split("-")[0]}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {["spotify", "apple", "youtube"].map((platform) => (
                                                <a
                                                    key={platform}
                                                    href={`/music/resolve?query=${encodeURIComponent(`${song.artist} ${song.title}`)}&platform=${platform}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-1 rounded-full hover:bg-(--color-bg-muted) text-(--color-text-tertiary) hover:text-(--color-accent) transition-colors text-[10px] uppercase font-black tracking-tighter"
                                                    title={`Listen on ${platform}`}
                                                >
                                                    {platform === "spotify" && (
                                                        <SpotifyIcon className="h-4 w-4" />
                                                    )}
                                                    {platform === "apple" && (
                                                        <AppleMusicIcon className="h-4 w-4" />
                                                    )}
                                                    {platform === "youtube" && (
                                                        <YoutubeMusicIcon className="h-4 w-4" />
                                                    )}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 px-6 gap-2 text-center text-(--color-text-tertiary)">
                                <LucideMusic className="h-6 w-6 opacity-30" />
                                <p className="text-[13px] font-medium">No tracks found.</p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};
