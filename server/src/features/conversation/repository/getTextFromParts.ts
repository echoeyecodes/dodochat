import type { Message } from "../types/index";

export const getTextFromParts = (parts: Message["parts"]) => {
    return (
        parts
            ?.filter((p) => p.type === "text")
            .map((p) => p.text)
            .join("") || ""
    );
};
