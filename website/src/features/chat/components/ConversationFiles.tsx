import { cn, formatFileSize, formatRelativeDate } from '@/lib/utils'
import { withCDN, isImage, isAudio } from '@/features/common/helpers'
import { LucideFile, LucideImage, LucideFileText, LucideX, LucideDownload, LucideSearch, LucideLoader2, LucideMic } from 'lucide-react'
import { useConversationFiles } from '../hooks/useConversationFiles'
import { useState } from 'react'

type ConversationFilesProps = {
    isOpen: boolean
    onClose: () => void
    conversation_id?: string
}

const getFileIcon = (file: { name: string, type: string }) => {
    if (isImage(file.name, file.type)) return <LucideImage className="w-4 h-4" />
    if (isAudio(file.name, file.type)) return <LucideMic className="w-4 h-4" />
    if (file.type === 'text/plain') return <LucideFileText className="w-4 h-4" />
    return <LucideFile className="w-4 h-4" />
}

export const ConversationFiles = ({ isOpen, onClose, conversation_id }: ConversationFilesProps) => {
    const [searchQuery, setSearchQuery] = useState('')
    const { data: files = [], isLoading } = useConversationFiles({
        id: conversation_id,
        enabled: isOpen && !!conversation_id
    })

    const filteredFiles = files.filter(file =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
    )



    const handleDownload = (url: string, name: string) => {
        const fullUrl = withCDN(url)
        const link = document.createElement('a')
        link.href = fullUrl
        link.download = name
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-(--color-bg-elevated) min-w-0">
            <div className="p-4 border-b border-(--color-border) flex items-center justify-between">
                <h3 className="font-semibold text-[14px] text-(--color-text-primary)">Files</h3>
                <button
                    onClick={onClose}
                    className="p-1.5 rounded-md hover:bg-(--color-bg-subtle) text-(--color-text-tertiary) transition-colors"
                >
                    <LucideX className="w-4 h-4" />
                </button>
            </div>
            {/* Search Input */}
            <div className="p-4">
                <div className="relative">
                    <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--color-text-quaternary)" />
                    <input
                        type="text"
                        placeholder="Search files..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-(--color-bg-subtle) border border-(--color-border) rounded-lg text-[13px] outline-none focus:ring-1 focus:ring-(--color-accent) transition-shadow"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2 pb-4">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-40">
                        <LucideLoader2 className="w-6 h-6 animate-spin text-(--color-text-tertiary)" />
                        <p className="text-[12px] text-(--color-text-tertiary) mt-2">Loading files...</p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-1">
                            {filteredFiles.map((file) => (
                                <div
                                    key={file.id}
                                    className="group p-2.5 rounded-xl hover:bg-(--color-bg-subtle) border border-transparent hover:border-(--color-border) transition-all cursor-pointer"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-(--color-bg-muted) flex items-center justify-center text-(--color-text-secondary) shrink-0 group-hover:bg-(--color-bg-elevated) transition-colors shadow-sm">
                                            {getFileIcon(file)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-[13px] font-medium text-(--color-text-primary) truncate">{file.name}</div>
                                            <div className="flex items-center gap-2 mt-1 line-clamp-1">
                                                <span className="text-[11px] text-(--color-text-tertiary)">{formatFileSize(file.size)}</span>
                                                <span className="w-1 h-1 rounded-full bg-(--color-border) shrink-0" />
                                                <span className="text-[11px] text-(--color-text-tertiary)">{formatRelativeDate(file.created_at)}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleDownload(file.url, file.name)
                                            }}
                                            className={cn(
                                                "p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-(--color-bg-elevated) text-(--color-text-tertiary) hover:text-(--color-accent) transition-all"
                                            )}
                                        >
                                            <LucideDownload className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredFiles.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-40 text-center px-6">
                                <div className="w-12 h-12 rounded-full bg-(--color-bg-subtle) flex items-center justify-center mb-3 text-(--color-text-quaternary)">
                                    <LucideFile className="w-6 h-6" />
                                </div>
                                <p className="text-[13px] text-(--color-text-secondary) font-medium">
                                    {searchQuery ? 'No results found' : 'No files yet'}
                                </p>
                                <p className="text-[12px] text-(--color-text-tertiary) mt-1">
                                    {searchQuery ? `We couldn't find any files matching "${searchQuery}"` : 'Any files shared in this chat will appear here.'}
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
