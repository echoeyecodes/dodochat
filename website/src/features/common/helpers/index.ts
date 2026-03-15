import envConfig from "@/lib/env";

export function withCDN(url: string | undefined): string {
    if (!url) return "";

    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//")) {
        return url;
    }

    if (
        !url.startsWith("/") &&
        url.includes(".") &&
        (!url.includes("/") || url.indexOf(".") < url.indexOf("/"))
    ) {
        return `https://${url}`;
    }

    const baseUrl = envConfig.get("CDN_URL")?.replace(/\/$/, "") || "";
    const cleanUrl = url.startsWith("/") ? url : `/${url}`;

    return `${baseUrl}${cleanUrl}`;
}

export function isImage(filename: string, mimeType?: string): boolean {
    return !!mimeType?.startsWith("image/") || /\.(jpg|jpeg|png|gif|webp)$/i.test(filename);
}

export function isAudio(filename: string, mimeType?: string): boolean {
    return !!mimeType?.startsWith("audio/") || /\.(mp3|wav|ogg|m4a|aac)$/i.test(filename);
}
