import { useRef, useEffect, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { withCDN, isImage, isAudio } from '@/features/common/helpers'
import { Streamdown } from 'streamdown'
import { code } from '@streamdown/code'
import { useChatContext } from '../context/ChatContext'
import { FileAttachment } from './FileAttachment'
import { ToolApplyImageEffect } from './tools/ToolApplyImageEffect'
import { ToolGenerateFile } from './tools/ToolGenerateFile'
import { ToolGetSystemInfo } from './tools/ToolGetSystemInfo'
import { ChatOptions } from './ChatOptions'
import { ShareDialog, type ShareDialogRef } from './ShareDialog'
import { UpdateConversationDialog, type UpdateConversationDialogRef } from './UpdateConversationDialog'
import { useUpdateConversation } from '../hooks/useUpdateConversation'
import { ConfirmationDialog, type ConfirmationDialogHandle } from '@/components/ui/confirmation-dialog'
import { useDeleteConversation } from '../hooks/useDeleteConversation'
import { useSidebar } from '../context/SidebarContext'
import { useFilesSidebar } from '../context/FilesSidebarContext'
import { LucideMenu, LucideExternalLink, LucideCopy, LucideFiles, LucideDownload, LucideChevronDown, LucidePlus } from 'lucide-react'
import { ConversationFiles } from './ConversationFiles'
import { AudioAttachment } from './AudioAttachment'
import { ChatTextArea } from './ChatTextArea'
import { ConversationEmptyState } from './ConversationEmptyState'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Link } from '@tanstack/react-router'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const STREAMDOWN_PLUGINS = { code }

const STREAMDOWN_COMPONENTS = {
  img: ({ src, alt }: { src?: string; alt?: string }) => {
    const imageUrl = src ? withCDN(src) : '';
    return (
      <div className="my-4 relative group max-w-fit overflow-hidden rounded-xl border border-(--color-border) shadow-sm bg-(--color-bg-subtle)">
        <img
          src={imageUrl}
          alt={alt}
          className="max-h-[400px] w-auto object-contain block transition-transform duration-500 group-hover:scale-[1.02]"
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={() => window.open(imageUrl, '_blank')}
            className="w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/40 transition-colors border border-white/30"
            title="View full size"
          >
            <LucideDownload className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }
}

const STREAMDOWN_LINK_SAFETY = {
  enabled: true,
  renderModal: ({ url, isOpen, onClose, onConfirm }: any) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-(--color-accent-subtle) flex items-center justify-center mb-2">
            <LucideExternalLink className="w-6 h-6 text-(--color-accent)" />
          </div>
          <DialogTitle className="text-xl">Open external link?</DialogTitle>
          <DialogDescription className="text-sm">
            You're about to visit an external website. Please be careful with your data.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 px-4 rounded-xl bg-(--color-bg-subtle) border border-(--color-border) break-all text-xs font-mono text-(--color-text-secondary)">
          {url}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button
            variant="outline"
            className="flex-1 gap-2"
            onClick={() => {
              navigator.clipboard.writeText(url)
              toast.success('Link copied to clipboard')
            }}
          >
            <LucideCopy className="w-4 h-4" />
            Copy link
          </Button>
          <Button
            className="flex-1 gap-2 bg-(--color-accent) text-white hover:bg-(--color-accent-hover)"
            onClick={onConfirm}
          >
            <LucideExternalLink className="w-4 h-4" />
            Open link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

type ConversationProps = {
  title?: string
  isSharedView?: boolean
  handleFork?: () => void
}

export const Conversation = ({ title, isSharedView = false, handleFork }: ConversationProps) => {
  const { messages, isLoading, error, clearError, conversationId, currentConversation } = useChatContext()
  const { mutate: updateConversation } = useUpdateConversation()
  const deleteMutation = useDeleteConversation({ active_id: conversationId })
  const { setIsOpen } = useSidebar()

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const renameDialogRef = useRef<UpdateConversationDialogRef>(null)
  const shareDialogRef = useRef<ShareDialogRef>(null)
  const confirmRef = useRef<ConfirmationDialogHandle>(null)
  const { isDesktopFilesOpen, isMobileFilesOpen, setMobileFilesOpen, toggleFiles } = useFilesSidebar()
  const [isMobile, setIsMobile] = useState(false)
  const [displayTitle, setDisplayTitle] = useState(title)
  const [showScrollButton, setShowScrollButton] = useState(false)

  useEffect(() => {
    setMobileFilesOpen(false)
  }, [setMobileFilesOpen])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const checkScrollVisibility = useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const { scrollTop, scrollHeight, clientHeight } = container
    const distanceToBottom = scrollHeight - scrollTop - clientHeight
    const isNearBottom = distanceToBottom < 100

    if (isLoading && lastPinnedId.current) {
      const activeElement = document.getElementById(`msg-${lastPinnedId.current}`)
      if (activeElement) {
        const isAtTopofTurn = Math.abs(scrollTop - (activeElement.offsetTop - 16)) < 50
        if (isAtTopofTurn && distanceToBottom < 400) {
          setShowScrollButton(false)
          return
        }
      }
    }
    setShowScrollButton(!isNearBottom)
  }, [isLoading])

  // Set up scroll listener
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => checkScrollVisibility()
    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [checkScrollVisibility])

  useEffect(() => {
    checkScrollVisibility()
  }, [messages, isLoading, checkScrollVisibility])



  const lastPinnedId = useRef<string | null>(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollToBottom = (behavior: ScrollBehavior = 'auto') => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior
      })
    }

    const scrollToMessage = (id: string, behavior: ScrollBehavior = 'smooth') => {
      const element = document.getElementById(`msg-${id}`)
      if (element && container) {
        container.scrollTo({
          top: element.offsetTop - 16,
          behavior
        })
      }
    }

    if (messages.length === 0) {
      lastPinnedId.current = null
      return
    }

    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')
    if (!lastUserMessage) return

    if (!lastPinnedId.current) {
      lastPinnedId.current = lastUserMessage.id

      if (!isLoading) {
        scrollToBottom('auto')
      } else {
        scrollToMessage(lastUserMessage.id, 'auto')
      }
      return
    }
    const isNewTurn = lastPinnedId.current !== lastUserMessage.id

    if (isNewTurn) {
      const timer = setTimeout(() => {
        scrollToMessage(lastUserMessage.id, 'smooth')
        lastPinnedId.current = lastUserMessage.id
      }, 50)
      return () => clearTimeout(timer)
    } else if (isLoading) {
      scrollToMessage(lastUserMessage.id, 'auto')
    }
  }, [messages.length, isLoading])

  const isRateLimitError = error?.message.includes('429') || error?.message.toLowerCase().includes('rate limit')

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-(--color-bg-elevated) relative">
      <div
        className="flex items-center justify-between px-4 md:px-6 py-4 bg-(--color-bg-elevated) z-10 border-b border-(--color-border)"
      >
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 -ml-2 rounded-md text-(--color-text-secondary) hover:bg-(--color-bg-subtle) hover:text-(--color-text-primary) transition-colors"
          >
            <LucideMenu className="w-5 h-5" />
          </button>

          <div className="flex flex-col">
            <span className="text-[14px] font-semibold text-(--color-text-primary)">{displayTitle || 'New Chat'}</span>
            <span className="text-[12px] text-(--color-text-tertiary)">
              {isLoading ? 'Thinking...' : 'Online'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          {conversationId && (
            <Link
              to="/conversations"
              className="p-2 rounded-full text-(--color-text-tertiary) hover:bg-(--color-bg-subtle) hover:text-(--color-text-primary) transition-colors"
              title="New chat"
            >
              <LucidePlus className="w-5 h-5 stroke-[1.5px]" />
            </Link>
          )}
          <button
            onClick={toggleFiles}
            className={cn(
              "p-2 rounded-full transition-all group relative",
              (isMobile ? isMobileFilesOpen : isDesktopFilesOpen)
                ? "text-(--color-text-primary) bg-(--color-bg-subtle)"
                : "text-(--color-text-tertiary) hover:bg-(--color-bg-subtle) hover:text-(--color-text-primary)"
            )}
            title="Toggle files sidebar"
          >
            <LucideFiles className="w-5 h-5 stroke-[1.5px]" />
            {(isMobile ? isMobileFilesOpen : isDesktopFilesOpen) && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-(--color-accent)" />
            )}
          </button>
          {conversationId && (
            <ChatOptions.Root conversationId={conversationId}>
              <ChatOptions.Trigger>
                <button className="p-2 rounded-full hover:bg-(--color-bg-subtle) transition-colors group">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-(--color-text-tertiary) group-hover:text-(--color-text-primary) transition-colors" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                  </svg>
                </button>
              </ChatOptions.Trigger>
              <ChatOptions.Content>
                <ChatOptions.RenameAction onAction={() => {
                  renameDialogRef.current?.open({
                    data: {
                      conversation_id: conversationId!,
                      current_title: displayTitle || '',
                    },
                    onConfirm: (_id, newTitle) => {
                      updateConversation({ id: _id, title: newTitle }, {
                        onSuccess: () => {
                          setDisplayTitle(newTitle)
                        }
                      })
                    },
                  })
                }} />
                <ChatOptions.ShareAction onAction={() => {
                  if (currentConversation) {
                    shareDialogRef.current?.open({
                      conversation_id: conversationId!,
                      visibility: currentConversation.visibility ?? 'private',
                      share_token: currentConversation.share_token,
                    })
                  }
                }} />
                <ChatOptions.DeleteAction onAction={() => {
                  confirmRef.current?.open({
                    title: 'Delete conversation?',
                    description: `Target: "${displayTitle}". This will permanently delete the chat history and all processed files.`,
                    confirmText: 'Delete',
                    variant: 'destructive',
                    onConfirm: async () => {
                      deleteMutation.mutate(conversationId!)
                    }
                  })
                }} />
              </ChatOptions.Content>
            </ChatOptions.Root>
          )}
        </div>
      </div>

      <UpdateConversationDialog ref={renameDialogRef} />
      <ShareDialog ref={shareDialogRef} />
      <ConfirmationDialog ref={confirmRef} />

      <div className="flex-1 flex flex-row min-h-0 relative overflow-hidden">
        {/* Message Column */}
        <div className="flex-1 flex flex-col min-h-0 bg-(--color-bg-elevated)">
          <div className="flex-1 min-h-0 relative">
            <div
              ref={scrollContainerRef}
              className="absolute inset-0 overflow-y-auto p-4 md:p-6 pb-8 md:pb-12 space-y-4 md:space-y-6"
            >
              <div className={cn("flex flex-col space-y-4 md:space-y-6", messages.length === 0 && "h-full justify-center")}>
                {messages.length === 0 && <ConversationEmptyState />}

                {messages.map((msg, i) => {
                  const isMe = msg.role === 'user'
                  const senderName = isMe ? 'Me' : 'AI Assistant'
                  const isLastAssistant = !isMe && isLoading && i === messages.length - 1

                  const prevMsg = messages[i - 1]
                  const nextMsg = messages[i + 1]
                  const isFirstInGroup = !prevMsg || prevMsg.role !== msg.role
                  const isLastInGroup = !nextMsg || nextMsg.role !== msg.role

                  const visibleParts = msg.parts.filter(p =>
                    p.type === 'text' ||
                    p.type === 'reasoning' ||
                    (p.type === 'file' && 'file' in p) ||
                    p.type.startsWith('tool-')
                  );
                  const hasVisibleContent = visibleParts.length > 0;

                  if (!isMe && !hasVisibleContent && !isLastAssistant) return null;

                  return (
                    <div
                      key={msg.id}
                      id={`msg-${msg.id}`}
                      className={cn(
                        "flex",
                        isMe ? 'flex-row-reverse items-end' : 'flex-row items-start',
                        !isFirstInGroup && "-mt-2 md:-mt-4",
                        !isMe && !hasVisibleContent && isLastAssistant && "animate-pulse",
                        !isMe && i === messages.length - 1 && isLoading && "min-h-[calc(100dvh-200px)]"
                      )}
                    >
                      <div className={cn("max-w-[85%] lg:max-w-[75%] flex flex-col", isMe ? 'items-end' : 'items-start')}>
                        {isFirstInGroup && (
                          <div className="flex items-baseline gap-2 mb-1.5 mx-1">
                            <span className="text-[12px] font-medium text-(--color-text-secondary)">
                              {senderName}
                            </span>
                          </div>
                        )}
                        <div
                          className={cn(
                            "px-4 py-3 text-[14px] max-w-full text-wrap wrap-break-word leading-relaxed shadow-sm min-h-[44px]",
                            isMe
                              ? "bg-(--color-text-primary) text-(--color-bg) whitespace-pre-wrap"
                              : "bg-(--color-bg-subtle) text-(--color-text-primary) border border-(--color-border)",
                            isMe
                              ? isLastInGroup ? "rounded-[16px_16px_4px_16px]" : "rounded-[16px_16px_4px_16px]"
                              : isLastInGroup ? "rounded-[16px_16px_16px_4px]" : "rounded-[16px_16px_16px_4px]"
                          )}
                        >
                          <div className="flex flex-col gap-3 w-full">
                            {!hasVisibleContent && isLastAssistant ? (
                              <div className="flex gap-1 items-center h-[20px] text-(--color-text-tertiary)">
                                <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce"></span>
                              </div>
                            ) : (
                              msg.parts.map((part, partIdx) => {
                                if (part.type === 'text') {
                                  return (
                                    <div key={partIdx}>
                                      {isMe ? part.text : (
                                        !part.text && isLastAssistant ? (
                                          <div className="flex gap-1 items-center h-[21px] text-(--color-text-tertiary)">
                                            <span className="animate-bounce [animation-delay:-0.3s] text-lg leading-none">.</span>
                                            <span className="animate-bounce [animation-delay:-0.15s] text-lg leading-none">.</span>
                                            <span className="animate-bounce text-lg leading-none">.</span>
                                          </div>
                                        ) : (
                                          <div className="streamdown">
                                            <Streamdown
                                              plugins={STREAMDOWN_PLUGINS}
                                              caret="block"
                                              isAnimating={isLastAssistant}
                                              components={STREAMDOWN_COMPONENTS}
                                              linkSafety={STREAMDOWN_LINK_SAFETY}
                                            >
                                              {part.text || ''}
                                            </Streamdown>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  );
                                }
                                if (part.type === 'file' && 'file' in part) {
                                  const itIsImage = isImage(part.file.name, part.media_type);
                                  const itIsAudio = isAudio(part.file.name, part.media_type);

                                  if (itIsImage) {
                                    const imageUrl = withCDN(part.file.url);
                                    return (
                                      <div key={partIdx} className="my-2 max-w-full overflow-hidden rounded-lg border border-(--color-border) shadow-sm bg-(--color-bg-subtle)">
                                        <img
                                          src={imageUrl}
                                          alt={part.file.name}
                                          className="max-h-[300px] w-auto object-contain cursor-zoom-in"
                                          onClick={() => window.open(imageUrl, '_blank')}
                                        />
                                      </div>
                                    );
                                  }

                                  if (itIsAudio) {
                                    return (
                                      <AudioAttachment
                                        key={partIdx}
                                        name={part.file.name}
                                        url={withCDN(part.file.url)}
                                        isMe={isMe}
                                        duration={part.file.metadata?.duration}
                                      />
                                    );
                                  }

                                  return (
                                    <FileAttachment
                                      key={partIdx}
                                      name={part.file.name}
                                      size={part.file.size}
                                      isMe={isMe}
                                    />
                                  );
                                }
                                if (part.type === 'reasoning') {
                                  const p = part as any;
                                  return (
                                    <div key={partIdx} className="w-full my-2 text-(--color-text-tertiary) text-[13px] border-l-2 border-(--color-border) pl-3 italic bg-black/2 cursor-default select-none">
                                      <div className="flex items-center gap-1.5 mb-1 not-italic font-bold text-[11px] uppercase tracking-wider opacity-50">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                                        Thinking
                                      </div>
                                      {p.reasoning}
                                    </div>
                                  );
                                }
                                if (part.type === 'tool-applyImageEffect') {
                                  return <ToolApplyImageEffect key={partIdx} part={part} />;
                                }

                                if (part.type === 'tool-getSystemInfo') {
                                  return <ToolGetSystemInfo key={partIdx} part={part} />;
                                }
                                if (part.type === 'tool-generateFile') {
                                  return <ToolGenerateFile key={partIdx} part={part} />;
                                }
                                return null;
                              })
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}

                {isLoading && messages[messages.length - 1]?.role === 'user' && (
                  <div className="flex items-start flex-row min-h-[calc(100dvh-200px)]">
                    <div className="max-w-[75%] flex flex-col items-start">
                      <div className="flex items-baseline gap-2 mb-1.5 mx-1">
                        <span className="text-[12px] font-medium text-(--color-text-secondary)">
                          AI Assistant
                        </span>
                      </div>
                      <div className="px-4 py-3 bg-(--color-bg-subtle) text-(--color-text-primary) border border-(--color-border) rounded-[16px_16px_16px_4px] min-h-[44px] flex items-center shadow-sm animate-pulse">
                        <div className="flex gap-1 items-center h-[20px] text-(--color-text-tertiary)">
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex items-start gap-2.5 px-3 py-2 rounded-lg bg-(--color-bg-subtle) border border-(--color-border) text-[13px] shadow-sm animate-in fade-in slide-in-from-bottom-2 max-w-lg">
                    <div className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-amber-500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                    </div>
                    <div className="flex-1 flex flex-wrap items-center gap-x-2 text-(--color-text-secondary)">
                      <span>
                        {isRateLimitError
                          ? "You have reached the rate limit for the default Gemini API key. To continue chatting without interruptions, you can use your own API key, or wait a few minutes before trying again."
                          : (error.message || 'Something went wrong.')}
                      </span>
                      {isRateLimitError && (
                        <Link to="/profile" className="text-(--color-accent) hover:underline font-medium">
                          Change API Key
                        </Link>
                      )}
                    </div>
                    <button
                      onClick={() => clearError()}
                      className="p-1 hover:bg-(--color-bg-hover) rounded-md transition-colors text-(--color-text-tertiary) hover:text-(--color-text-primary)"
                      title="Dismiss"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} className="h-4 w-full shrink-0" />
            </div>

            {/* Scroll to Bottom Button */}
            {showScrollButton && (
              <button
                onClick={() => {
                  scrollContainerRef.current?.scrollTo({
                    top: scrollContainerRef.current.scrollHeight,
                    behavior: 'smooth'
                  })
                }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 p-2 rounded-full bg-(--color-bg-elevated) border border-(--color-border) text-(--color-text-secondary) shadow-sm hover:text-(--color-text-primary) hover:bg-(--color-bg-subtle) hover:border-(--color-text-tertiary)/30 transition-all duration-200 animate-in fade-in zoom-in-90 slide-in-from-bottom-2 z-20 group"
                title="Scroll to bottom"
              >
                <LucideChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                {isLoading && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-(--color-accent) rounded-full border border-(--color-bg-elevated) animate-pulse" />
                )}
              </button>
            )}
          </div>
          {!isSharedView ? <ChatTextArea /> : (
            <div className="px-4 py-6 bg-(--color-bg-elevated) border-t border-(--color-border) flex flex-col items-center gap-3">
              <p className="text-sm text-(--color-text-secondary) mb-1">
                You are viewing a shared conversation.
              </p>
              <Button
                className="gap-2 bg-(--color-accent) text-white hover:bg-(--color-accent-hover) px-8 h-11 rounded-full shadow-lg transition-all hover:scale-[1.02]"
                onClick={handleFork}
              >
                <LucidePlus className="w-5 h-5" />
                Continue this conversation
              </Button>
            </div>
          )}
        </div>

        {/* Desktop Sidebar */}
        <div className={cn(
          "hidden xl:flex flex-col shrink-0 transition-all duration-300 ease-in-out border-l border-(--color-border) overflow-hidden bg-(--color-bg-elevated)",
          isDesktopFilesOpen ? "w-80 opacity-100" : "w-0 opacity-0 border-l-transparent"
        )}>
          <div className="w-80 h-full">
            <ConversationFiles
              isOpen={isDesktopFilesOpen}
              onClose={() => toggleFiles()}
              conversation_id={conversationId ?? undefined}
            />
          </div>
        </div>

        {/* Mobile Sidebar (Sheet) */}
        <Sheet open={isMobileFilesOpen} onOpenChange={setMobileFilesOpen}>
          <SheetContent side="right" className="p-0 border-none w-[280px] sm:w-80">
            <div className="flex h-full w-full absolute inset-0">
              <ConversationFiles
                isOpen={true}
                onClose={() => setMobileFilesOpen(false)}
                conversation_id={conversationId ?? undefined}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
