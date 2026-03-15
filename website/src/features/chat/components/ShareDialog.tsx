import { useState, useImperativeHandle, forwardRef } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LucideLink, LucideCopy, LucideCheck, LucideExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useShareConversation } from "../hooks/useShareConversation";
import { cn } from "@/lib/utils";

export type ShareDialogRef = {
    open: (data: {
        conversation_id: string;
        visibility: "private" | "public";
        share_token?: string;
    }) => void;
};

export const ShareDialog = forwardRef<ShareDialogRef>((_, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<{
        conversation_id: string;
        visibility: "private" | "public";
        share_token?: string;
    } | null>(null);
    const [copied, setCopied] = useState(false);
    const shareMutation = useShareConversation();

    useImperativeHandle(ref, () => ({
        open: (data) => {
            setData(data);
            setIsOpen(true);
            setCopied(false);
        },
    }));

    const handleToggleSharing = () => {
        if (!data) return;
        const newVisibility = data.visibility === "public" ? "private" : "public";
        shareMutation.mutate(
            { id: data.conversation_id, visibility: newVisibility },
            {
                onSuccess: (updatedConv) => {
                    setData({
                        conversation_id: updatedConv._id,
                        visibility: updatedConv.visibility || "private",
                        share_token: updatedConv.share_token,
                    });
                },
            },
        );
    };

    const shareUrl = data?.share_token ? `${window.location.origin}/s/${data.share_token}` : "";

    const handleCopyLink = () => {
        if (!shareUrl) return;
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        toast.success("Link copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
    };

    const isPublic = data?.visibility === "public";

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[420px]">
                <DialogHeader className="min-w-0">
                    <div className="w-12 h-12 rounded-full bg-(--color-accent-subtle) flex items-center justify-center mb-2">
                        <LucideLink className="w-6 h-6 text-(--color-accent)" />
                    </div>
                    <DialogTitle className="text-xl">Share Conversation</DialogTitle>
                    <DialogDescription>
                        Anyone with the link can view this conversation and continue it as their
                        own.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4 min-w-0 w-full overflow-hidden">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-(--color-border) bg-(--color-bg-subtle) min-w-0">
                        <div className="flex flex-col gap-0.5 min-w-0">
                            <span className="text-sm font-semibold text-(--color-text-primary)">
                                Public Access
                            </span>
                            <span className="text-xs text-(--color-text-secondary) truncate">
                                {isPublic ? "Anyone with the link can view" : "Only you can view"}
                            </span>
                        </div>

                        <button
                            onClick={handleToggleSharing}
                            disabled={shareMutation.isPending}
                            className={cn(
                                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-(--color-accent) focus:ring-offset-2",
                                isPublic ? "bg-(--color-accent)" : "bg-(--color-bg-muted)",
                            )}
                        >
                            <span
                                className={cn(
                                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                                    isPublic ? "translate-x-5" : "translate-x-0",
                                )}
                            />
                        </button>
                    </div>

                    {isPublic && data?.share_token && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300 w-full overflow-hidden">
                            <div className="flex flex-col gap-2 min-w-0">
                                <label className="text-xs font-medium text-(--color-text-secondary) ml-1">
                                    Shared Link
                                </label>
                                <div className="flex gap-2 w-full min-w-0">
                                    <div className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-(--color-bg-subtle) border border-(--color-border) text-sm text-(--color-text-primary) font-mono flex items-center overflow-hidden">
                                        <span className="block truncate w-full">{shareUrl}</span>
                                    </div>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={handleCopyLink}
                                        className="shrink-0"
                                    >
                                        {copied ? (
                                            <LucideCheck className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <LucideCopy className="w-4 h-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-center gap-4">
                                <Button
                                    variant="link"
                                    className="text-xs gap-1.5 text-(--color-accent)"
                                    onClick={() => window.open(shareUrl, "_blank")}
                                >
                                    <LucideExternalLink className="w-3.5 h-3.5" />
                                    Preview shared page
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        className="w-full sm:w-auto"
                    >
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});

ShareDialog.displayName = "ShareDialog";
