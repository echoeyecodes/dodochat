import { cn, formatFileSize } from '@/lib/utils'
import { LucideFile, LucideImage, LucideFileText, LucideLoader2 } from 'lucide-react'
import { useConversationFiles } from '../hooks/useConversationFiles'
import { useState, useEffect, useCallback } from 'react'

type MentionDropdownProps = {
    conversation_id?: string
    query: string
    onSelect: (file: { id: string; name: string }) => void
    onClose: () => void
}

export const MentionDropdown = ({
    conversation_id,
    query,
    onSelect,
    onClose
}: MentionDropdownProps) => {
    const { data: files = [], isLoading } = useConversationFiles({
        id: conversation_id,
        enabled: !!conversation_id
    })

    const [selectedIndex, setSelectedIndex] = useState(0)

    const filteredFiles = files.filter(file =>
        file.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5) // Limit to 5 results for clarity

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setSelectedIndex(prev => (prev + 1) % filteredFiles.length)
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setSelectedIndex(prev => (prev - 1 + filteredFiles.length) % filteredFiles.length)
        } else if (e.key === 'Enter') {
            e.preventDefault()
            if (filteredFiles[selectedIndex]) {
                onSelect(filteredFiles[selectedIndex])
            }
        } else if (e.key === 'Escape') {
            onClose()
        }
    }, [filteredFiles, selectedIndex, onSelect, onClose])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown])

    const getFileIcon = (type: string) => {
        if (type.startsWith('image/')) return <LucideImage className="w-3.5 h-3.5" />
        if (type === 'text/plain') return <LucideFileText className="w-3.5 h-3.5" />
        return <LucideFile className="w-3.5 h-3.5" />
    }

    return (
        <div className="absolute bottom-full left-1 mb-3 w-72 bg-(--color-bg-elevated) border border-(--color-border) rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="px-3 py-2 border-b border-(--color-border)/50 bg-(--color-bg-subtle)/30">
                <span className="text-[10px] font-bold text-(--color-text-tertiary) uppercase tracking-widest pl-0.5">Files</span>
            </div>

            <div className="py-1 max-h-60 overflow-y-auto mt-0.5">
                {isLoading && files.length === 0 ? (
                    <div className="px-4 py-8 flex items-center justify-center gap-2">
                        <LucideLoader2 className="w-3.5 h-3.5 animate-spin text-(--color-text-tertiary)" />
                        <span className="text-[11px] text-(--color-text-tertiary) font-medium">Searching files...</span>
                    </div>
                ) : filteredFiles.length > 0 ? (
                    filteredFiles.map((file, index) => (
                        <div key={file.id} className="px-1">
                            <button
                                onClick={() => onSelect(file)}
                                onMouseEnter={() => setSelectedIndex(index)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-2 py-1.5 text-left transition-all rounded-xl",
                                    index === selectedIndex ? "bg-(--color-bg-muted) scale-[1.01]" : "bg-transparent"
                                )}
                            >
                                <div className={cn(
                                    "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                                    index === selectedIndex ? "bg-(--color-bg-elevated) shadow-sm" : "bg-(--color-bg-muted)"
                                )}>
                                    <div className={cn(
                                        index === selectedIndex ? "text-(--color-accent)" : "text-(--color-text-secondary)"
                                    )}>
                                        {getFileIcon(file.type)}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className={cn(
                                        "text-[13px] font-semibold truncate",
                                        index === selectedIndex ? "text-(--color-text-primary)" : "text-(--color-text-secondary)"
                                    )}>{file.name}</div>
                                    <div className="text-[10px] text-(--color-text-tertiary) font-medium mt-0.5">{formatFileSize(file.size)}</div>
                                </div>
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="px-6 py-10 flex flex-col items-center justify-center text-center">
                        <div className="w-9 h-9 rounded-full bg-(--color-bg-subtle) flex items-center justify-center mb-3">
                            <LucideFile className="w-4 h-4 text-(--color-text-quaternary)" />
                        </div>
                        <span className="text-[13px] font-semibold text-(--color-text-primary)">
                            {!conversation_id ? 'Start a chat first' : (query ? 'No matching files' : 'No files')}
                        </span>
                        <span className="text-[11px] text-(--color-text-tertiary) mt-1 leading-relaxed">
                            {!conversation_id ? 'Send a message to start sharing.' : (query ? `No files match "${query}"` : 'Files you share here will appear.')}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}
