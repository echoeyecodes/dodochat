export const ConversationSessionSkeleton = () => {
    return (
        <div className="flex-1 flex flex-col min-h-0 bg-(--color-bg-elevated) relative animate-in fade-in duration-500">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between px-4 md:px-6 py-4 bg-(--color-bg-elevated) z-10 border-b border-(--color-border)">
                <div className="flex items-center gap-3">
                    <div className="flex flex-col gap-2">
                        <div className="w-24 h-4 bg-(--color-bg-muted) rounded-md animate-pulse" />
                        <div className="w-12 h-3 bg-(--color-bg-subtle) rounded-md animate-pulse opacity-50" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-(--color-bg-muted) animate-pulse" />
                    <div className="w-8 h-8 rounded-full bg-(--color-bg-muted) animate-pulse" />
                </div>
            </div>

            {/* Main Content Skeleton (Matches Empty State for index route) */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="text-center w-full max-w-[500px] space-y-8">
                    <div className="space-y-3">
                        <div className="w-12 h-12 rounded-full bg-(--color-bg-muted) mx-auto animate-pulse" />
                        <div className="w-48 h-3 bg-(--color-bg-subtle) mx-auto rounded-md animate-pulse opacity-50" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="h-[46px] rounded-xl bg-(--color-bg-subtle) border border-(--color-border) animate-pulse"
                                style={{ animationDelay: `${i * 100}ms` }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Input Skeleton (Matches ChatTextArea) */}
            <div className="p-3 md:p-4 bg-(--color-bg-elevated) border-t border-(--color-border)">
                <div className="w-full h-14 rounded-lg bg-(--color-bg-subtle) border border-(--color-border) animate-pulse" />
            </div>
        </div>
    );
};
