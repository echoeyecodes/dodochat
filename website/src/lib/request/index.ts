import { HTTP_STATUS_CODES } from "@/features/common/constants/http-status-codes";
import { ErrorBody } from "./ErrorBody";
import { objectToQueryParams } from "./object-to-query";
import envConfig from "../env";

type RequestType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type RefreshResult = {
    access_token: string;
    refresh_token: string;
} | null;

export type RequestParams = {
    path: string;
    base?: string;
    body?: any;
    method?: RequestType;
    headers?: any;
    query?: object;
    exclude_trailing_slash?: boolean;
    skipAutoRefresh?: boolean;
};

const BASE_API_URL = envConfig.get("BASE_API_URL");

let refreshPromise: Promise<RefreshResult> | null = null;

const buildUrl = (base: string, path: string, query?: object, excludeTrailingSlash?: boolean): string => {
    const cleanBase = base.replace(/\/$/, "");
    const cleanPath = path.replace(/^\//, "");
    const queryString = objectToQueryParams(query ?? {});
    let url = `${cleanBase}/${cleanPath}${queryString}`;

    if (excludeTrailingSlash) {
        url = url.replace(/\/$/, "");
    }

    return url;
};

const getServerHeaders = async (): Promise<Record<string, string>> => {
    if (typeof window !== 'undefined') return {};

    try {
        const { getHeaders } = await import('./headers');
        const allHeaders = await getHeaders({});
        const serverHeaders: Record<string, string> = {};

        const cookieHeader = allHeaders['cookie'] || allHeaders['Cookie'];
        if (cookieHeader) {
            serverHeaders['cookie'] = cookieHeader;
        }

        if (allHeaders["user-agent"]) {
            serverHeaders["x-website-user-agent"] = allHeaders["user-agent"]
        }

        // Forward Cloudflare headers for IP tracking
        if (allHeaders["cf-connecting-ip"]) {
            serverHeaders["x-website-cf-connecting-ip"] = allHeaders["cf-connecting-ip"]
        }
        if (allHeaders["cf-ipcountry"]) {
            serverHeaders["x-website-cf-ipcountry"] = allHeaders["cf-ipcountry"]
        }
        if (allHeaders["x-forwarded-for"]) {
            serverHeaders["x-website-x-forwarded-for"] = allHeaders["x-forwarded-for"]
        }

        return serverHeaders;
    } catch {
        return {};
    }
};

const attemptTokenRefresh = async (): Promise<RefreshResult> => {
    if (refreshPromise) return refreshPromise;

    const cleanBase = BASE_API_URL.replace(/\/$/, "");
    const serverHeaders = await getServerHeaders();

    refreshPromise = fetch(`${cleanBase}/api/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
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
    let errorResponse: any;

    try {
        const isJson = response.headers.get("Content-Type")?.includes("application/json");
        errorResponse = isJson ? await response.json() : await response.text();
    } catch (error: any) {
        throw new ErrorBody(
            response.status,
            error?.message?.toString() ?? response.statusText,
            error?.name ?? "UNEXPECTED_ERROR",
            error
        );
    }

    if (typeof errorResponse === "string") {
        throw new ErrorBody(response.status, errorResponse, "UNEXPECTED_ERROR");
    }

    const message = errorResponse?.message ?? errorResponse?.error?.message ?? response.statusText;

    throw new ErrorBody(
        errorResponse?.code ?? response.status,
        typeof message === "string" ? message : JSON.stringify(message),
        errorResponse?.name ?? "UNEXPECTED_ERROR",
        errorResponse
    );
};

const executeRequest = async (
    url: string,
    method: string,
    requestHeaders: any,
    body: any,
    isFormData: boolean,
): Promise<any> => {
    let requestBody = undefined;
    if (body) {
        requestBody = isFormData ? body : JSON.stringify(body);
    }

    const response = await fetch(url, {
        method,
        headers: requestHeaders,
        credentials: 'include',
        body: requestBody,
    });

    if (!response.ok) {
        return parseErrorResponse(response);
    }

    const isJson = response.headers.get("Content-Type")?.includes("application/json");
    const data = isJson ? await response.json() : await response.text();

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
}: RequestParams): Promise<any> => {
    const url = buildUrl(base, path, query, exclude_trailing_slash);
    const serverHeaders = await getServerHeaders();
    const isFormData = body instanceof FormData;

    const requestHeaders: any = {
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
                if (typeof window === 'undefined') {
                    requestHeaders['cookie'] = `access_token=${refreshed.access_token}; refresh_token=${refreshed.refresh_token}`;
                    const { updateAuthSession } = await import('@/features/auth/helpers');
                    await updateAuthSession({
                        data: {
                            access_token: refreshed.access_token,
                            refresh_token: refreshed.refresh_token,
                        },
                    }).catch(() => { });
                }

                return await executeRequest(url, method, requestHeaders, body, isFormData);
            }
        }
        throw error;
    }
};
