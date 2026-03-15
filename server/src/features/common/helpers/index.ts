import type { Response } from "express";
import envConfig from "@/lib/env";

export const sendResponse =
    ({ res, status }: { res: Response; status: number }) =>
    (result: unknown) => {
        const resultObj =
            result && typeof result === "object" ? (result as Record<string, unknown>) : null;
        const response = resultObj?.data ?? result;
        const metadata = resultObj?.metadata;

        return res.status(status).json({
            data: response,
            metadata,
        });
    };

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

    const baseUrl = (envConfig.get("CDN_URL") as string)?.replace(/\/$/, "") || "";
    const cleanUrl = url.startsWith("/") ? url : `/${url}`;

    return `${baseUrl}${cleanUrl}`;
}
