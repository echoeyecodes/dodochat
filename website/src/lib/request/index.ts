import { HTTP_STATUS_CODES } from "@/features/common/constants/http-status-codes";
import { ErrorBody } from "./ErrorBody";
import { objectToQueryParams } from "./object-to-query";
import { applyCookiesFromResponse } from "./apply-cookies";
import envConfig from "../env";

type RequestType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type RefreshResult = {
    access_token: string;
    refresh_token: string;
} | null;

export type RequestParams = {
    path: string;
    base?: string;
    body?: unknown;
    method?: RequestType;
    headers?: Record<string, string>;
    query?: Record<string, unknown>;
    exclude_trailing_slash?: boolean;
    skipAutoRefresh?: boolean;
};

const BASE_API_URL = envConfig.get("BASE_API_URL");

let refreshPromise: Promise<RefreshResult> | null = null;

const buildUrl = (
    base: string,
    path: string,
    query?: object,
    excludeTrailingSlash?: boolean,
): string => {
    const cleanBase = base.replace(/\/$/, "");
    const cleanPath = path.replace(/^\//, "");
    const queryString = objectToQueryParams((query as Record<string, unknown>) ?? {});
    let url = `${cleanBase}/${cleanPath}${queryString}`;

    if (excludeTrailingSlash) {
        url = url.replace(/\/$/, "");
    }

    return url;
};

const getServerHeaders = async (): Promise<Record<string, string>> => {
    if (typeof window !== "undefined") return {};

    try {
        const { getHeaders } = await import("./headers");
        const allHeaders = await getHeaders({});
        const serverHeaders: Record<string, string> = {};

        const cookieHeader = allHeaders["cookie"] || allHeaders["Cookie"];
        if (cookieHeader) {
            serverHeaders["cookie"] = cookieHeader;
        }

        if (allHeaders["user-agent"]) {
            serverHeaders["x-website-user-agent"] = allHeaders["user-agent"];
        }

        // Forward Cloudflare headers for IP tracking
        if (allHeaders["cf-connecting-ip"]) {
            serverHeaders["x-website-cf-connecting-ip"] = allHeaders["cf-connecting-ip"];
        }
        if (allHeaders["cf-ipcountry"]) {
            serverHeaders["x-website-cf-ipcountry"] = allHeaders["cf-ipcountry"];
        }
        if (allHeaders["x-forwarded-for"]) {
            serverHeaders["x-website-x-forwarded-for"] = allHeaders["x-forwarded-for"];
        }

        return serverHeaders;
    } catch {
        return {};
    }
};

const attemptTokenRefresh = async (): Promise<RefreshResult> => {
    if (refreshPromise) return refreshPromise;

    const cleanBase = (BASE_API_URL as string).replace(/\/$/, "");
    const serverHeaders = await getServerHeaders();

    refreshPromise = fetch(`${cleanBase}/api/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...serverHeaders,
        },
    })
        .then(async (res) => {
            if (!res.ok) return null;
            const body = await res.json();
            return (body.data || body) as RefreshResult;
        })
        .catch(() => null)
        .finally(() => {
            refreshPromise = null;
        });

    return refreshPromise;
};

const parseErrorResponse = async (response: Response): Promise<never> => {
    let errorResponse: unknown;

    try {
        const isJson = response.headers.get("Content-Type")?.includes("application/json");
        errorResponse = isJson ? await response.json() : await response.text();
    } catch (error: unknown) {
        const err = error as Error;
        throw new ErrorBody(
            response.status,
            err?.message?.toString() ?? response.statusText,
            err?.name ?? "UNEXPECTED_ERROR",
            error,
        );
    }

    const errorData = errorResponse as Record<string, unknown>;
    const message =
        errorData?.message ??
        (errorData?.error as Record<string, unknown>)?.message ??
        response.statusText;

    throw new ErrorBody(
        (errorData?.code as number) ?? response.status,
        typeof message === "string" ? message : JSON.stringify(message),
        (errorData?.name as string) ?? "UNEXPECTED_ERROR",
        errorResponse,
    );
};

const executeRequest = async (
    url: string,
    method: string,
    requestHeaders: Record<string, string>,
    body: unknown,
    isFormData: boolean,
): Promise<{ data: unknown; response: Response }> => {
    let requestBody = undefined;
    if (body) {
        requestBody = isFormData ? body : JSON.stringify(body);
    }

    const response = await fetch(url, {
        method,
        headers: requestHeaders,
        credentials: "include",
        body: requestBody as BodyInit,
    });

    if (!response.ok) {
        return parseErrorResponse(response);
    }

    const isJson = response.headers.get("Content-Type")?.includes("application/json");
    const data = isJson ? await response.json() : await response.text();

    await applyCookiesFromResponse(response.headers.get("set-cookie"));

    return { data, response };
};

export const request = async ({
    base = BASE_API_URL,
    path,
    method = "GET",
    headers,
    body,
    query,
    exclude_trailing_slash = false,
    skipAutoRefresh = false,
}: RequestParams): Promise<{ data: unknown; response: Response }> => {
    const url = buildUrl(
        base as string,
        path,
        query as Record<string, unknown>,
        exclude_trailing_slash,
    );
    const serverHeaders = await getServerHeaders();
    const isFormData = body instanceof FormData;

    const requestHeaders: Record<string, string> = {
        Accept: "application/json",
        ...serverHeaders,
        ...headers,
    };

    if (!isFormData) {
        requestHeaders["Content-Type"] = "application/json";
    }

    try {
        return await executeRequest(url, method, requestHeaders, body, isFormData);
    } catch (error) {
        if (
            error instanceof ErrorBody &&
            error.code === HTTP_STATUS_CODES.UNAUTHORIZED &&
            !skipAutoRefresh
        ) {
            const refreshed = await attemptTokenRefresh();

            if (refreshed) {
                if (typeof window === "undefined") {
                    requestHeaders["cookie"] =
                        `access_token=${refreshed.access_token}; refresh_token=${refreshed.refresh_token}`;
                }

                return await executeRequest(url, method, requestHeaders, body, isFormData);
            }
        }
        throw error;
    }
};
