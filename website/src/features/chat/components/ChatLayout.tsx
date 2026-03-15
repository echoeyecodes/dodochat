import { useCallback, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ConversationList } from "./ConversationList";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { FilesSidebarProvider } from "../context/FilesSidebarContext";
import { Sheet, SheetContent } from "@/components/ui/sheet";
type ChatLayoutProps = {
    activeConversationId?: string | null;
    children?: React.ReactNode;
};

export const ChatLayoutInner = ({ activeConversationId, children }: ChatLayoutProps) => {
    const navigate = useNavigate();
    const { isOpen, setIsOpen } = useSidebar();

    const handleSelectConversation = useCallback(
        (id: string) => {
            navigate({ to: "/conversations/$id", params: { id } });
            setIsOpen(false);
        },
        [navigate, setIsOpen],
    );

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [setIsOpen]);

    return (
        <div className="flex relative h-full w-full overflow-hidden rounded-xl bg-(--color-bg-elevated) border border-(--color-border) shadow-[0_20px_60px_-12px_rgba(0,0,0,0.08),0_8px_20px_-8px_rgba(0,0,0,0.04)]">
            {/* Desktop Sidebar */}
            <div className="hidden md:flex shrink-0 border-r border-(--color-border)">
                <ConversationList
                    activeId={activeConversationId}
                    onSelect={handleSelectConversation}
                />
            </div>

            {/* Mobile Sidebar (Sheet) */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent side="left" className="p-0 border-none w-[280px]">
                    <div className="flex h-full w-full absolute inset-0">
                        <ConversationList
                            activeId={activeConversationId}
                            onSelect={handleSelectConversation}
                        />
                    </div>
                </SheetContent>
            </Sheet>

            <div className="flex-1 flex flex-col min-w-0 bg-(--color-bg-elevated)">{children}</div>
        </div>
    );
};

export const ChatLayout = (props: ChatLayoutProps) => {
    return (
        <SidebarProvider>
            <FilesSidebarProvider>
                <ChatLayoutInner {...props} />
            </FilesSidebarProvider>
        </SidebarProvider>
    );
};
