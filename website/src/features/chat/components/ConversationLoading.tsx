export const ConversationLoading = () => {
  return (
    <div className="flex-1 flex flex-col bg-(--color-bg-elevated) relative">
      <div className="flex items-center justify-between px-6 py-4 bg-(--color-bg-elevated) z-10 border-b border-(--color-border)">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-(--color-bg-muted) animate-pulse" />
          <div className="flex flex-col gap-1.5">
            <div className="w-24 h-4 bg-(--color-bg-muted) rounded-md animate-pulse" />
            <div className="w-16 h-3 bg-(--color-bg-subtle) rounded-md animate-pulse" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className={`flex flex-col gap-2 ${i % 2 === 0 ? 'items-end' : 'items-start'}`}
          >
            <div className={`flex items-end gap-2 ${i % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="w-8 h-8 rounded-full shrink-0 mb-1 bg-(--color-bg-muted) animate-pulse" />
              <div className={`w-64 h-16 bg-(--color-bg-subtle) animate-pulse ${i % 2 === 0 ? 'rounded-[16px_16px_4px_16px]' : 'rounded-[16px_16px_16px_4px]'}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-(--color-bg-elevated) z-10 border-t border-(--color-border)">
        <div className="w-full h-12 rounded-lg shadow-sm bg-(--color-bg-subtle) border border-(--color-border) animate-pulse" />
      </div>
    </div>
  );
};
