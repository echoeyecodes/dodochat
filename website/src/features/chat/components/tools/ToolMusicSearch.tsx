import React from "react";
import { type UIMessagePart } from "ai";
import { type ChatTools } from "../../context/ChatContext";
import {
    LucideMusic,
    LucideDisc,
    LucideLoader2,
    LucideAlertCircle,
    LucidePlay,
    LucideChevronDown,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const formatDuration = (ms?: number) => {
    if (!ms) return null;
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
};

export const ToolMusicSearch: React.FC<ToolMusicSearchProps> = ({ part: p }) => {
    if (p.state === "output-error") {
        return (
            <div className="flex items-start gap-3 p-4 rounded-xl border border-(--color-border) bg-(--color-bg-subtle) text-(--color-text-secondary) my-4">
                <div className="h-8 w-8 rounded-full bg-(--color-error)/10 flex items-center justify-center shrink-0">
                    <LucideAlertCircle className="h-4 w-4 text-(--color-error)" />
                </div>
                <div className="flex flex-col gap-1 pt-1">
                    <span className="text-xs font-bold text-(--color-error) uppercase tracking-wider">
                        Error
                    </span>
                    <p className="text-[12px] leading-relaxed">
                        {p.errorText || "Could not retrieve music data."}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[560px] my-6 font-body animate-in fade-in slide-in-from-bottom-2 duration-700">
            {/* Header */}
            <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                    <LucideMusic className="h-3.5 w-3.5 text-(--color-accent)" />
                    <span className="text-[11px] font-bold text-(--color-text-primary) uppercase tracking-widest">
                        Music
                    </span>
                </div>
                {p.state === "output-available" && p.output?.songs && (
                    <span className="text-[10px] font-medium text-(--color-text-quaternary) uppercase">
                        {p.output.songs.length} results
                    </span>
                )}
            </div>

            <div className="relative">
                <div className="absolute -inset-px bg-linear-to-b from-(--color-border) to-transparent rounded-xl opacity-50 pointer-events-none" />

                <div className="relative border border-(--color-border-subtle) rounded-xl bg-(--color-bg-elevated) shadow-xs overflow-hidden">
                    <div className="divide-y divide-(--color-border-subtle)/50">
                        {p.state === "input-streaming" || p.state === "input-available" ? (
                            <div className="flex items-center justify-center py-12 gap-3 text-(--color-text-tertiary)">
                                <LucideLoader2 className="h-4 w-4 animate-spin opacity-40" />
                                <span className="text-[12px] font-medium">Searching...</span>
                            </div>
                        ) : p.state === "output-available" && p.output?.songs ? (
                            p.output.songs.length > 0 ? (
                                p.output.songs.map((song, i) => {
                                    const coverUrl = getCoverArtUrl(song.releaseId);
                                    const duration = formatDuration(song.duration);

                                    return (
                                        <div
                                            key={song.id || i}
                                            className="group flex items-center gap-4 p-3.5 hover:bg-(--color-accent)/2 transition-all duration-300"
                                        >
                                            <div className="relative shrink-0 h-11 w-11 rounded-lg bg-(--color-bg-muted) border border-(--color-border-subtle) overflow-hidden transition-transform duration-500 group-hover:scale-[1.03]">
                                                {coverUrl ? (
                                                    <img
                                                        src={coverUrl}
                                                        alt=""
                                                        className="h-full w-full object-cover opacity-0 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                                                        onLoad={(e) =>
                                                            (e.currentTarget.style.opacity = "1")
                                                        }
                                                    />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center opacity-20">
                                                        <LucideDisc className="h-5 w-5" />
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent pointer-events-none" />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-3 mb-0.5">
                                                    <h4 className="text-[13px] font-bold text-(--color-text-primary) group-hover:text-(--color-accent) transition-colors truncate">
                                                        {song.title}
                                                    </h4>
                                                    <div className="flex items-center gap-2.5 shrink-0">
                                                        {duration && (
                                                            <span className="text-[10px] font-mono text-(--color-text-quaternary) group-hover:text-(--color-text-tertiary) transition-colors mr-1">
                                                                {duration}
                                                            </span>
                                                        )}
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-(--color-bg-subtle) border border-(--color-border-subtle) text-[9px] font-bold text-(--color-text-secondary) hover:text-(--color-accent) hover:border-(--color-accent)/30 transition-all opacity-0 group-hover:opacity-100 uppercase tracking-tighter cursor-pointer outline-none">
                                                                    <LucidePlay className="h-2 w-2 fill-current" />
                                                                    Listen
                                                                    <LucideChevronDown className="h-2.5 w-2.5 opacity-50" />
                                                                </button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent
                                                                align="end"
                                                                className="p-1"
                                                            >
                                                                <DropdownMenuItem asChild>
                                                                    <a
                                                                        href={`/music/resolve?query=${encodeURIComponent(`${song.artist} ${song.title}`)}&platform=apple`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="flex items-center gap-2 w-full"
                                                                    >
                                                                        Apple Music
                                                                    </a>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem asChild>
                                                                    <a
                                                                        href={`/music/resolve?query=${encodeURIComponent(`${song.artist} ${song.title}`)}&platform=spotify`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="flex items-center gap-2 w-full"
                                                                    >
                                                                        Spotify
                                                                    </a>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem asChild>
                                                                    <a
                                                                        href={`/music/resolve?query=${encodeURIComponent(`${song.artist} ${song.title}`)}&platform=youtube`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="flex items-center gap-2 w-full"
                                                                    >
                                                                        YouTube Music
                                                                    </a>
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 overflow-hidden text-[11px]">
                                                    <span className="font-bold text-(--color-text-secondary) truncate">
                                                        {song.artist}
                                                    </span>
                                                    {song.release && (
                                                        <span className="text-(--color-text-tertiary) truncate opacity-70 italic max-w-[150px]">
                                                            • {song.release}
                                                        </span>
                                                    )}
                                                    {song.date && (
                                                        <span className="text-(--color-text-quaternary) shrink-0">
                                                            • {song.date.split("-")[0]}
                                                        </span>
                                                    )}
                                                    {song.isrc && (
                                                        <span className="text-[9px] font-mono text-(--color-text-quaternary) truncate opacity-50 ml-auto pl-2">
                                                            ISRC: {song.isrc}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="flex flex-col items-center justify-center py-16 px-6 gap-2 text-center">
                                    <span className="text-sm font-bold text-(--color-text-secondary)">
                                        No results found
                                    </span>
                                    <p className="text-[11px] text-(--color-text-tertiary)">
                                        Try another search term
                                    </p>
                                </div>
                            )
                        ) : null}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-3 flex items-center justify-between px-1">
                <span className="text-[9px] font-bold text-(--color-text-quaternary) uppercase tracking-widest">
                    Metadata Output / MusicBrainz
                </span>
                <div className="h-px flex-1 mx-4 bg-(--color-border-subtle) opacity-30" />
                <span className="text-[9px] font-mono text-(--color-text-quaternary) opacity-50">
                    2.2_STABLE
                </span>
            </div>
        </div>
    );
};
