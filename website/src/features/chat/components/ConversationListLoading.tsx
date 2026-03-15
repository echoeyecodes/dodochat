export const ConversationListLoading = () => {
    return (
        <div className="flex flex-col gap-1 w-full p-2">
            {[1, 2, 3, 4, 5].map((i) => (
                <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg border border-transparent"
                >
                    <div className="w-10 h-10 rounded-full shrink-0 bg-(--color-bg-muted) animate-pulse" />
                    <div className="flex-1 min-w-0 flex flex-col gap-2">
                        <div className="flex justify-between items-baseline h-3">
                            <div className="w-24 h-full bg-(--color-bg-muted) rounded-md animate-pulse" />
                            <div className="w-10 h-full bg-(--color-bg-muted) rounded-md animate-pulse ml-2" />
                        </div>
                        <div className="w-3/4 h-2.5 bg-(--color-bg-muted) rounded-md animate-pulse" />
                    </div>
                </div>
            ))}
        </div>
    );
};
