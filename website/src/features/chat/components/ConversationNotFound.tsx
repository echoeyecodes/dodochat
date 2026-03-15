import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { LucideMessageSquareOff, LucideArrowLeft } from "lucide-react"

export const ConversationNotFound = () => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center h-full bg-(--color-bg-elevated) px-6">
            <div className="text-center w-full max-w-[400px] animate-in fade-in zoom-in-95 duration-500">

                {/* Standard Icon - Matches Empty State size */}
                <div className="w-12 h-12 rounded-full bg-(--color-bg-muted) flex items-center justify-center mx-auto mb-4">
                    <LucideMessageSquareOff className="size-5 text-(--color-text-tertiary) stroke-[1.8px]" />
                </div>

                {/* Content - Matches Empty State rhythm */}
                <div className="space-y-2 mb-8">
                    <h2 className="text-[16px] font-semibold text-(--color-text-primary)">
                        Conversation not found
                    </h2>
                    <p className="text-[14px] text-(--color-text-tertiary) leading-relaxed">
                        This chat doesn't exist or you don't have access to it.
                        Let's get you back to the workbench.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                    <Button
                        asChild
                        variant="default"
                        size="lg"
                        roundness="xl"
                        className="w-full h-11 text-[14px] font-semibold shadow-sm shadow-orange-500/10 active:scale-[0.98] transition-all"
                    >
                        <Link to="/conversations">
                            Start New Chat
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="ghost"
                        roundness="xl"
                        className="w-full h-10 text-[13px] text-(--color-text-tertiary) hover:text-(--color-text-primary) transition-all"
                    >
                        <Link to="/">
                            <div className="flex items-center gap-2">
                                <LucideArrowLeft className="size-3.5" />
                                Return Home
                            </div>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
