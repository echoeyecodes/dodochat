import { cn, formatFileSize } from "@/lib/utils";
import { withCDN } from "@/features/common/helpers";
import { type UIMessagePart } from "ai";
import { type ChatTools } from "../../context/ChatContext";
import { LucideFileText, LucideDownload, LucideX } from "lucide-react";

type ToolGenerateFilePart = Extract<
    UIMessagePart<Record<string, unknown>, ChatTools>,
    { type: "tool-generateFile" }
>;

type ToolGenerateFileProps = {
    part: ToolGenerateFilePart;
};

export const ToolGenerateFile: React.FC<ToolGenerateFileProps> = ({ part: p }) => {
    const isPdf =
        p.state === "output-available"
            ? p.output.file_url.endsWith(".pdf")
            : p.input?.format === "pdf";

    const handleDownload = () => {
        if (p.state === "output-available") {
            window.open(withCDN(p.output.file_url), "_blank");
        }
    };

    if (p.state === "output-error") {
        return (
            <div className="flex items-center gap-2 mt-2 px-3 py-2 rounded-lg border border-red-500/20 bg-red-500/5 text-[12px] text-red-500">
                <LucideX className="w-3.5 h-3.5" />
                <span>{p.errorText}</span>
            </div>
        );
    }

    return (
        <div className="my-2.5 w-full max-w-[320px]">
            <div
                onClick={handleDownload}
                className={cn(
                    "flex items-center gap-3 p-2.5 rounded-xl border transition-all",
                    p.state === "output-available"
                        ? "bg-(--color-bg-subtle) border-(--color-border) cursor-pointer hover:border-(--color-accent)/30 hover:shadow-sm"
                        : "bg-(--color-bg-subtle)/50 border-(--color-border)/50 cursor-default",
                )}
            >
                <div
                    className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                        isPdf
                            ? "bg-red-500/10 text-red-500"
                            : "bg-(--color-accent)/10 text-(--color-accent)",
                    )}
                >
                    <LucideFileText className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0 pr-1 text-left">
                    <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[13px] font-medium text-(--color-text-primary) truncate">
                            {p.state === "output-available"
                                ? p.output.message.split(": ").pop() || p.input?.filename
                                : p.input?.filename || "Generating..."}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-(--color-text-tertiary) font-medium uppercase tracking-tight">
                            {p.state === "output-available" && p.output.size
                                ? `${formatFileSize(p.output.size)} • `
                                : ""}
                            {isPdf ? "PDF Document" : "Text File"}
                        </span>
                        {p.state === "output-available" ? (
                            <div className="flex items-center gap-1.5 ml-auto">
                                <span className="text-[10px] text-(--color-accent) font-bold flex items-center gap-1">
                                    <LucideDownload className="w-3 h-3" />
                                    Download
                                </span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 ml-auto">
                                <span className="text-[10px] text-(--color-text-tertiary) animate-pulse italic">
                                    Processing...
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
