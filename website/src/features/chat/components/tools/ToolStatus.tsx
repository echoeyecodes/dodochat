import * as React from "react";
import { LucideAlertCircle, LucideLoader2, LucideCheckCircle2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ToolCallContextValue = {
    expanded: boolean;
    setExpanded: (v: boolean) => void;
};

const ToolCallContext = React.createContext<ToolCallContextValue | null>(null);

function useToolCall() {
    const ctx = React.useContext(ToolCallContext);
    if (!ctx) throw new Error("useToolCall must be used within <ToolCall>");
    return ctx;
}

export const ToolCall = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        const [expanded, setExpanded] = React.useState(false);

        return (
            <ToolCallContext.Provider value={{ expanded, setExpanded }}>
                <div
                    ref={ref}
                    className={cn(
                        "flex flex-col my-1.5 animate-in fade-in duration-300 text-[13px] font-mono tracking-tight text-(--color-text-secondary)",
                        className,
                    )}
                    {...props}
                />
            </ToolCallContext.Provider>
        );
    },
);
ToolCall.displayName = "ToolCall";

export const ToolCallTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, onClick, ...props }, ref) => {
    const { expanded, setExpanded } = useToolCall();

    return (
        <button
            ref={ref}
            onClick={(e) => {
                setExpanded(!expanded);
                onClick?.(e);
            }}
            className={cn(
                "flex items-center gap-2.5 text-left w-max hover:text-(--color-text-primary) transition-colors cursor-pointer",
                className,
            )}
            {...props}
        />
    );
});
ToolCallTrigger.displayName = "ToolCallTrigger";

export const ToolCallIcon = React.forwardRef<
    SVGSVGElement,
    { status: "loading" | "error" | "success"; className?: string }
>(({ status, className }, ref) => {
    if (status === "loading") {
        return (
            <LucideLoader2
                ref={ref}
                className={cn("h-3.5 w-3.5 shrink-0 animate-spin opacity-80", className)}
                strokeWidth={2.5}
            />
        );
    }
    if (status === "error") {
        return (
            <LucideAlertCircle
                ref={ref}
                className={cn("h-3.5 w-3.5 shrink-0 text-(--color-error)", className)}
                strokeWidth={2.5}
            />
        );
    }
    return (
        <LucideCheckCircle2
            ref={ref}
            className={cn("h-3.5 w-3.5 shrink-0 text-(--color-success)", className)}
            strokeWidth={2.5}
        />
    );
});
ToolCallIcon.displayName = "ToolCallIcon";

export const ToolCallMessage = React.forwardRef<
    HTMLSpanElement,
    React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => <span ref={ref} className={className} {...props} />);
ToolCallMessage.displayName = "ToolCallMessage";

export const ToolCallDetails = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const { expanded } = useToolCall();
    if (!expanded) return null;

    return (
        <div ref={ref} className={cn("pl-6 mt-1.5 opacity-80", className)} {...props}>
            <pre
                className="whitespace-pre-wrap font-inherit text-[12px] opacity-80 leading-relaxed border-l-[1.5px] border-(--color-border-subtle) pl-3 -ml-0.5 my-1"
            >
                {children}
            </pre>
        </div>
    );
});
ToolCallDetails.displayName = "ToolCallDetails";

export const ToolCallChevron = React.forwardRef<
    SVGSVGElement,
    React.ComponentProps<typeof ChevronRight>
>(({ className, ...props }, ref) => {
    const { expanded } = useToolCall();
    return (
        <ChevronRight
            ref={ref as React.RefObject<SVGSVGElement>}
            className={cn(
                "h-3.5 w-3.5 shrink-0 transition-transform",
                expanded && "rotate-90",
                className,
            )}
            strokeWidth={2.5}
            {...props}
        />
    );
});
ToolCallChevron.displayName = "ToolCallChevron";
