import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useConversations } from '../hooks/useConversations'
import { useSearchConversations } from '../hooks/useSearchConversations'
import { ConversationListLoading } from './ConversationListLoading'
import { ConversationListError } from './ConversationListError'
import { Link } from '@tanstack/react-router'
import { ConfirmationDialog, type ConfirmationDialogHandle } from '@/components/ui/confirmation-dialog'
import { LucideTrash2, LucideLoader2 } from 'lucide-react'
import { useDeleteConversation } from '../hooks/useDeleteConversation'
import { useSidebar } from '../context/SidebarContext'

type ConversationListProps = {
  activeId?: string | null;
  onSelect?: (id: string) => void;
}

export const ConversationList = ({ activeId, onSelect }: ConversationListProps) => {
  const { data: conversations = [], isLoading: isListLoading, isError: isListError, error: listError, refetch } = useConversations()
  const deleteMutation = useDeleteConversation({ active_id: activeId })
  const { setIsOpen } = useSidebar()
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  const { data: searchResults = [], isLoading: isSearchLoading } = useSearchConversations(debouncedSearch, {
    enabled: true,
    stale_time: 1000 * 60 * 5
  })

  const isSearching = debouncedSearch.trim().length > 0
  const displayItems = isSearching ? searchResults : conversations
  const isLoading = isListLoading || (isSearching && isSearchLoading)
  const isError = isListError
  const error = listError

  const confirmRef = useRef<ConfirmationDialogHandle>(null)

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const isToday = date.toDateString() === now.toDateString()
    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
  }

  const handleDelete = (e: React.MouseEvent, id: string, title: string) => {
    e.preventDefault()
    e.stopPropagation()
    confirmRef.current?.open({
      title: 'Delete conversation?',
      description: `Target: "${title}". This will permanently delete the chat history and all processed files.`,
      confirmText: 'Delete',
      variant: 'destructive',
      onConfirm: async () => {
        deleteMutation.mutate(id)
      }
    })
  }

  return (
    <div
      className="w-[280px] shrink-0 flex flex-col bg-(--color-bg) border-r border-(--color-border)"
    >
      <div className="p-4 border-b border-(--color-border) flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[14px] font-semibold text-(--color-text-primary) tracking-tight">Messages</h2>
          <div className="flex items-center gap-1">
            <Link
              to='/conversations'
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-md hover:bg-(--color-bg-subtle) text-(--color-text-tertiary) hover:text-(--color-text-primary) transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </Link>
          </div>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-md bg-(--color-bg-elevated) border border-(--color-border)"
        >
          {isSearching && isSearchLoading ? (
            <LucideLoader2 className="w-3.5 h-3.5 animate-spin text-(--color-text-tertiary)" />
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          )}
          <input
            type="text"
            placeholder="Search chats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-[13px] bg-transparent outline-none text-(--color-text-primary)"
          />
          {search.length > 0 && (
            <button
              onClick={() => setSearch('')}
              className="p-1 rounded-full hover:bg-(--color-bg-muted) text-(--color-text-tertiary) hover:text-(--color-text-primary) transition-all duration-200"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2 scrollbar-hide">
        {isLoading && !isSearching && <ConversationListLoading />}

        {isError && (
          <ConversationListError
            error={error as Error}
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && displayItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-[13px] text-(--color-text-tertiary)">
              {conversations.length === 0 ? 'No conversations yet' : 'No results found'}
            </p>
          </div>
        )}
        {displayItems.map((conv) => (
          <Link
            key={conv._id}
            to={`/conversations/${conv._id}` as any}
            onClick={() => onSelect?.(conv._id)}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg cursor-pointer mb-1 transition-all duration-200 border group",
              activeId === conv._id
                ? "bg-(--color-bg-elevated) border-(--color-border-subtle)"
                : "bg-transparent border-transparent hover:bg-(--color-bg-subtle)"
            )}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-[13px] shrink-0 bg-(--color-bg-muted) text-(--color-text-secondary)"
            >
              {conv.title.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="text-[13px] font-semibold truncate text-(--color-text-primary)">
                  {conv.title}
                </h3>
                <div className="relative ml-2 w-12 flex justify-end items-center">
                  <span className="text-[10px] font-medium text-(--color-text-quaternary) transition-opacity duration-200 group-hover:opacity-0">
                    {formatTime(conv.updated_at)}
                  </span>
                  <button
                    onClick={(e) => handleDelete(e, conv._id, conv.title)}
                    className="absolute inset-y-0 right-0 opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-red-50 text-(--color-text-tertiary) hover:text-red-600 transition-all duration-200 flex items-center justify-center scale-90 group-hover:scale-100"
                  >
                    <LucideTrash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-[12px] truncate text-(--color-text-secondary)">
                {conv.preview || 'No messages yet'}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <ConfirmationDialog ref={confirmRef} />
    </div>
  )
}
