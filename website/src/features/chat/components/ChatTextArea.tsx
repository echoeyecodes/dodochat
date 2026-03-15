import { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useChatContext } from '../context/ChatContext';
import { useUploadFile } from '../../media/hooks/useUploadFile';
import { conversationApi } from '../api';
import type { FileResponse } from '../../media/types';
import { useMention } from '../hooks/useMention';
import { MentionDropdown } from './MentionDropdown';
import type { ConversationFile } from '../types';

export const ChatTextArea = () => {
    const { input, setInput, sendMessage, isLoading, conversationId, setConversationId } = useChatContext();
    const [stagedFiles, setStagedFiles] = useState<(FileResponse | ConversationFile)[]>([]);
    const [uploadingFiles, setUploadingFiles] = useState<{ id: string, name: string, progress: number }[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const uploadFileMutation = useUploadFile();
    const { mentionState, handleInput, closeMention } = useMention(textareaRef);

    useEffect(() => {
        textareaRef.current?.focus();
    }, [conversationId]);

    // Auto-grow textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const adjustHeight = () => {
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
        };

        textarea.addEventListener('input', adjustHeight);
        adjustHeight();

        return () => textarea.removeEventListener('input', adjustHeight);
    }, [input]);

    const onSelectFile = useCallback((file: any) => {
        const text = textareaRef.current?.value || '';
        const cursorPosition = mentionState.cursorPosition;
        const query = mentionState.query;

        const prefix = text.slice(0, cursorPosition);
        const suffix = text.slice(cursorPosition + query.length + 1);

        setInput((prefix + suffix).trim() + ' ');

        const fileId = file.id || (file as any)._id;
        if (!stagedFiles.find(f => (f.id || (f as any)._id) === fileId)) {
            setStagedFiles(prev => [...prev, file as ConversationFile]);
        }

        closeMention();
        textareaRef.current?.focus();
    }, [mentionState, closeMention, setInput, stagedFiles]);

    const addStagedFile = (file: FileResponse) => {
        setStagedFiles(prev => [...prev, file]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if ((!input.trim() && stagedFiles.length === 0) || isLoading) return;

        const parts: any[] = [];
        if (input.trim()) {
            parts.push({ type: 'text', text: input });
        }

        stagedFiles.forEach(file => {
            const fileId = file.id || (file as any)._id;
            parts.push({
                type: 'file',
                media_type: file.type,
                file: {
                    name: file.name,
                    url: (file as any).url,
                    id: fileId
                }
            });
        });

        sendMessage({ parts } as any, {
            body: conversationId ? { conversationId } : undefined
        });
        setInput('');
        setStagedFiles([]);
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const tempId = Math.random().toString(36).substring(7);
        setUploadingFiles(prev => [...prev, { id: tempId, name: file.name, progress: 0 }]);

        let currentId = conversationId;

        if (!currentId) {
            try {
                const newConv = await conversationApi.createConversation();
                currentId = newConv._id;
                if (setConversationId) {
                    setConversationId(currentId);
                }
            } catch (error) {
                console.error('Failed to create conversation:', error);
                setUploadingFiles(prev => prev.filter(f => f.id !== tempId));
                return;
            }
        }

        if (currentId) {
            const progressInterval = setInterval(() => {
                setUploadingFiles(prev => prev.map(f =>
                    f.id === tempId ? { ...f, progress: Math.min(f.progress + 10, 90) } : f
                ));
            }, 100);

            uploadFileMutation.mutate({ file, conversation_id: currentId }, {
                onSuccess: (data) => {
                    clearInterval(progressInterval);
                    setUploadingFiles(prev => prev.filter(f => f.id !== tempId));
                    addStagedFile(data);
                },
                onError: () => {
                    clearInterval(progressInterval);
                    setUploadingFiles(prev => prev.filter(f => f.id !== tempId));
                }
            });
        }

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="p-3 md:p-4 bg-(--color-bg-elevated) z-10 border-t border-(--color-border)">
            <div className="flex flex-wrap gap-2 mb-2 md:mb-3">
                {uploadingFiles.map((file) => (
                    <div
                        key={file.id}
                        className="flex items-center gap-2.5 p-1.5 pl-2 pr-3 rounded-lg bg-(--color-bg) border border-(--color-border) text-[12px] shadow-sm animate-in fade-in slide-in-from-bottom-1"
                    >
                        <div className="w-5 h-5 flex items-center justify-center shrink-0">
                            <div className="w-3 h-3 border-2 border-(--color-accent) border-t-transparent rounded-full animate-spin" />
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                            <span className="text-(--color-text-secondary) font-medium truncate max-w-[120px]">{file.name}</span>
                            <div className="h-0.5 w-full bg-(--color-bg-muted) rounded-full overflow-hidden mt-1">
                                <div
                                    className="h-full bg-(--color-accent) transition-all duration-300"
                                    style={{ width: `${file.progress}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ))}

                {stagedFiles.map((file) => (
                    <div
                        key={file.id}
                        className="flex items-center gap-2 p-1.5 pl-2 pr-3 rounded-lg bg-(--color-bg) border border-(--color-border) text-[12px] shadow-sm animate-in fade-in slide-in-from-bottom-1 relative group hover:ring-1 hover:ring-(--color-accent)/20 transition-all"
                    >
                        <div className="w-5 h-5 rounded-md bg-(--color-accent)/10 flex items-center justify-center shrink-0">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-(--color-accent)">
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                            </svg>
                        </div>
                        <span className="text-(--color-text-primary) font-medium truncate max-w-[140px]">{file.name}</span>
                        <button
                            type="button"
                            onClick={() => setStagedFiles(prev => prev.filter(f => f.id !== file.id))}
                            className="w-4 h-4 rounded-full flex items-center justify-center text-(--color-text-tertiary) hover:text-red-500 hover:bg-red-50 transition-colors ml-1"
                        >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
            <form
                onSubmit={handleSubmit}
                className="flex items-end gap-2 p-2 rounded-lg shadow-sm bg-(--color-bg) border border-(--color-border) relative z-20"
            >
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadFileMutation.isPending}
                    className="p-2 mb-0.5 shrink-0 text-(--color-text-tertiary) hover:text-(--color-text-primary) transition-colors disabled:opacity-50"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".txt,.pdf,image/*,audio/*"
                    onChange={handleFileChange}
                />
                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                        handleInput();
                    }}
                    onKeyUp={handleInput}
                    onMouseUp={handleInput}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey && !mentionState.isOpen) {
                            e.preventDefault();
                            handleSubmit(e);
                        }
                    }}
                    placeholder="Send a message..."
                    autoFocus
                    className="flex-1 max-h-[160px] min-h-[24px] py-2.5 px-2 text-[16px] bg-transparent outline-none resize-none text-(--color-text-primary) overflow-y-auto"
                    rows={1}
                />

                {mentionState.isOpen && (
                    <MentionDropdown
                        conversation_id={conversationId ?? undefined}
                        query={mentionState.query}
                        onSelect={onSelectFile}
                        onClose={closeMention}
                    />
                )}
                <button
                    type="submit"
                    disabled={(!input.trim() && stagedFiles.length === 0) || isLoading}
                    className={cn(
                        "shrink-0 mb-0.5 w-[36px] h-[36px] rounded-md flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                        (input.trim() || stagedFiles.length > 0) && !isLoading
                            ? "bg-(--color-accent) text-(--color-bg)"
                            : "bg-(--color-bg-muted) text-(--color-text-quaternary)"
                    )}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </form>
        </div>
    );
};
