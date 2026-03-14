import { cn, formatFileSize } from '@/lib/utils';

type FileAttachmentProps = {
    name: string;
    size?: number;
    isMe: boolean;
    className?: string;
}

export const FileAttachment = ({ name, size, isMe, className }: FileAttachmentProps) => {
    return (
        <div
            className={cn(
                "flex items-center gap-2.5 p-2 rounded-lg border transition-all",
                isMe
                    ? "bg-white/10 border-white/20 hover:bg-white/15"
                    : "bg-(--color-bg) border-(--color-border) hover:border-(--color-accent)/30",
                className
            )}
        >
            <div className={cn(
                "w-8 h-8 rounded-md flex items-center justify-center shrink-0",
                isMe ? "bg-white/20" : "bg-(--color-bg-muted)"
            )}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isMe ? "text-white" : "text-(--color-accent)"}>
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
            </div>
            <div className="flex flex-col min-w-0 pr-1">
                <span className={cn(
                    "text-[13px] font-medium truncate",
                    isMe ? "text-white" : "text-(--color-text-primary)"
                )}>
                    {name}
                </span>
                <span className={cn(
                    "text-[10px] opacity-60 font-medium uppercase tracking-tight",
                    isMe ? "text-white/80" : "text-(--color-text-tertiary)"
                )}>
                    {size ? `${formatFileSize(size)} • ` : ''}Document
                </span>
            </div>
        </div>
    );
};
