import { withCDN } from "@/features/common/helpers";
import { cn, formatDuration } from "@/lib/utils";

type AudioAttachmentProps = {
    name: string;
    url: string;
    isMe: boolean;
    duration?: number;
    className?: string;
};

export const AudioAttachment = ({ name, url, isMe, duration, className }: AudioAttachmentProps) => {
    return (
        <div
            className={cn(
                "my-2 min-w-[240px] md:min-w-[300px] p-3 rounded-xl shadow-sm border transition-all",
                isMe ? "bg-white/10 border-white/20" : "bg-(--color-bg) border-(--color-border)",
                className,
            )}
        >
            <div className="flex items-center gap-3 mb-2">
                <div
                    className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                        isMe
                            ? "bg-white/20 text-white"
                            : "bg-(--color-accent)/10 text-(--color-accent)",
                    )}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" y1="19" x2="12" y2="23"></line>
                        <line x1="8" y1="23" x2="16" y2="23"></line>
                    </svg>
                </div>
                <div className="flex flex-col min-w-0">
                    <span
                        className={cn(
                            "text-[12px] font-medium truncate",
                            isMe ? "text-white" : "text-(--color-text-primary)",
                        )}
                    >
                        {name}
                    </span>
                    <span
                        className={cn(
                            "text-[10px] opacity-70 font-medium uppercase tracking-tight",
                            isMe ? "text-white/80" : "text-(--color-text-tertiary)",
                        )}
                    >
                        Audio Attachment {duration ? `• ${formatDuration(duration)}` : ""}
                    </span>
                </div>
            </div>
            <audio
                src={withCDN(url)}
                controls
                className={cn(
                    "w-full h-8 brightness-90 contrast-125",
                    isMe && "brightness-200 contrast-150 grayscale invert",
                )}
            />
        </div>
    );
};
