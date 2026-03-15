import { useState, useCallback } from "react";

export type MentionState = {
    isOpen: boolean;
    query: string;
    cursorPosition: number;
    rect: DOMRect | null;
};

export const useMention = (textareaRef: React.RefObject<HTMLTextAreaElement | null>) => {
    const [mentionState, setMentionState] = useState<MentionState>({
        isOpen: false,
        query: "",
        cursorPosition: -1,
        rect: null,
    });

    const handleInput = useCallback(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const text = textarea.value;
        const selectionStart = textarea.selectionStart;
        const lastAtIndex = text.lastIndexOf("@", selectionStart - 1);

        if (lastAtIndex !== -1) {
            const queryText = text.slice(lastAtIndex + 1, selectionStart);
            // Show only if '@' is at the start of the line or after a space
            const charBeforeAt = lastAtIndex > 0 ? text[lastAtIndex - 1] : " ";

            if (/\s/.test(charBeforeAt) && !/\s/.test(queryText)) {
                setMentionState({
                    isOpen: true,
                    query: queryText,
                    cursorPosition: lastAtIndex,
                    rect: null,
                });
                return;
            }
        }

        setMentionState((prev) => ({ ...prev, isOpen: false }));
    }, [textareaRef]);

    const closeMention = useCallback(() => {
        setMentionState((prev) => ({ ...prev, isOpen: false }));
    }, []);

    return { mentionState, handleInput, closeMention };
};
