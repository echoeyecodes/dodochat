type ConversationListErrorProps = {
  error: Error | null;
  onRetry?: () => void;
};

export const ConversationListError = ({ error, onRetry }: ConversationListErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center h-[200px] gap-3">
      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-(--color-danger)/10 text-(--color-danger) mb-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <p className="text-[13px] font-medium text-(--color-text-primary)">
        Failed to load messages
      </p>
      <p className="text-[12px] text-(--color-text-secondary) max-w-[200px] line-clamp-2">
        {error?.message || "An unexpected error occurred while fetching your conversations."}
      </p>
      
      <button 
        onClick={onRetry}
        className="mt-2 px-4 py-1.5 text-[12px] font-semibold rounded-md border border-(--color-border) bg-(--color-bg-elevated) hover:bg-(--color-bg-subtle) text-(--color-text-primary) transition-colors flex items-center gap-1.5"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 2v6h-6"></path>
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
          <path d="M3 22v-6h6"></path>
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
        </svg>
        Retry
      </button>
    </div>
  );
};
