import React from "react";
import { withCDN } from "@/features/common/helpers";

import { type UIMessagePart } from "ai";
import { type ChatTools } from "../../context/ChatContext";

type ToolApplyImageEffectPart = Extract<
    UIMessagePart<Record<string, unknown>, ChatTools>,
    { type: "tool-applyImageEffect" }
>;

type ToolApplyImageEffectProps = {
    part: ToolApplyImageEffectPart;
};

export const ToolApplyImageEffect: React.FC<ToolApplyImageEffectProps> = ({ part: p }) => {
    return (
        <div className="bg-(--color-bg-muted) border border-(--color-border) rounded-lg p-3 my-2 text-[12px] font-mono w-full min-w-[240px]">
            <div className="flex items-center gap-2 mb-2 text-(--color-text-secondary) font-bold">
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-(--color-accent)"
                >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                </svg>
                Image Processed
            </div>
            {p.state === "input-streaming" || p.state === "input-available" ? (
                <div className="flex gap-2 items-center text-(--color-text-tertiary)">
                    <div className="w-2 h-2 rounded-full bg-(--color-accent) animate-ping" />
                    Processing image...
                </div>
            ) : p.state === "output-available" ? (
                <div className="space-y-2">
                    <div className="text-(--color-text-secondary) italic mb-1">
                        {p.output.message}
                    </div>
                    <div className="rounded-md border border-(--color-border) overflow-hidden bg-black/5">
                        <img
                            src={withCDN(p.output.new_file_url)}
                            alt="Processed"
                            className="max-h-[200px] w-auto mx-auto object-contain cursor-zoom-in"
                            onClick={() => window.open(withCDN(p.output.new_file_url), "_blank")}
                        />
                    </div>
                </div>
            ) : p.state === "output-error" ? (
                <div className="text-red-500 flex items-center gap-2">
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    Error: {p.errorText}
                </div>
            ) : null}
        </div>
    );
};
