import React, { createContext, useContext, useState, useMemo } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { LucidePencil, LucideTrash2, LucideLink } from "lucide-react";

/**
 * 1. TYPES & CONTEXT
 */

type ChatOptionsContextType = {
    conversationId: string;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
};

const ChatOptionsContext = createContext<ChatOptionsContextType | null>(null);

const useChatOptions = () => {
    const context = useContext(ChatOptionsContext);
    if (!context) {
        throw new Error("ChatOptions components must be wrapped in ChatOptions.Root");
    }
    return context;
};

/**
 * 2. ROOT & PROVIDER
 */

type RootProps = {
    conversationId: string;
    children: React.ReactNode;
    className?: string;
};

const Root = ({ conversationId, children, className }: RootProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const value = useMemo(
        () => ({
            conversationId,
            isOpen,
            setIsOpen,
        }),
        [conversationId, isOpen],
    );

    return (
        <ChatOptionsContext.Provider value={value}>
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <div className={cn("relative inline-block", className)}>{children}</div>
            </DropdownMenu>
        </ChatOptionsContext.Provider>
    );
};

/**
 * 3. UI COMPONENTS
 */

const Trigger = ({ children }: { children: React.ReactNode }) => {
    return (
        <DropdownMenuTrigger className="focus:outline-none" asChild>
            {children}
        </DropdownMenuTrigger>
    );
};

const Content = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <DropdownMenuContent
            align="end"
            className={cn(
                "w-48 p-1 border border-(--color-border) bg-(--color-bg-elevated) shadow-lg rounded-xl",
                className,
            )}
        >
            {children}
        </DropdownMenuContent>
    );
};

type ItemProps = React.ComponentProps<typeof DropdownMenuItem> & {
    children: React.ReactNode;
};

const Item = ({ children, className, ...props }: ItemProps) => {
    return (
        <DropdownMenuItem
            className={cn(
                "gap-3 px-3 py-2.5 text-[13px] font-medium text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-bg-subtle) transition-colors cursor-pointer rounded-lg",
                className,
            )}
            {...props}
        >
            {children}
        </DropdownMenuItem>
    );
};

/**
 * 4. SMART ACTIONS
 */

type ActionProps = {
    onAction?: (conversationId: string) => void;
    className?: string;
};

const RenameAction = ({ onAction, className }: ActionProps) => {
    const { conversationId, setIsOpen } = useChatOptions();

    const handlePress = () => {
        setIsOpen(false);
        onAction?.(conversationId);
    };

    return (
        <Item onClick={handlePress} className={className}>
            <LucidePencil className="w-4 h-4 opacity-60" />
            <span>Rename</span>
        </Item>
    );
};

const ShareAction = ({ onAction, className }: ActionProps) => {
    const { conversationId, setIsOpen } = useChatOptions();

    const handlePress = () => {
        setIsOpen(false);
        onAction?.(conversationId);
    };

    return (
        <Item onClick={handlePress} className={className}>
            <LucideLink className="w-4 h-4 opacity-60" />
            <span>Share</span>
        </Item>
    );
};

const DeleteAction = ({ onAction, className }: ActionProps) => {
    const { conversationId, setIsOpen } = useChatOptions();

    const handlePress = () => {
        setIsOpen(false);
        onAction?.(conversationId);
    };

    return (
        <Item
            onClick={handlePress}
            className={cn("text-red-500! hover:text-red-600! hover:bg-red-50!", className)}
        >
            <LucideTrash2 className="w-4 h-4 opacity-60" />
            <span>Delete</span>
        </Item>
    );
};

/**
 * 5. EXPORT NAMESPACE
 */

export const ChatOptions = {
    Root,
    Trigger,
    Content,
    Item,
    RenameAction,
    ShareAction,
    DeleteAction,
};
