/* eslint-disable no-useless-catch */
import ErrorBody from "./ErrorBody";
import objectToQueryParams from "./object-to-query";

type RequestType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type ErrorResponse = {
    message?: string;
    code?: number;
    error?: unknown;
    name?: string;
    [key: string]: unknown;
};

export type RequestParams = {
    path: string;
    base: string;
    body?: unknown;
    method?: RequestType;
    headers?: Record<string, string>;
    query?: Record<string, unknown>;
    exclude_trailing_slash?: boolean;
};

const request: (params: RequestParams) => Promise<{ data: unknown; response: Response }> = async ({
    base,
    path,
    method,
    headers,
    body,
    query,
    exclude_trailing_slash = false,
}: RequestParams) => {
    let url = `${base}/${
        path.startsWith("/") ? path.slice(1) : path
    }${objectToQueryParams(query ?? {})}`;
    if (exclude_trailing_slash && url.endsWith("/")) {
        url = url.slice(0, -1);
    }

    const requestHeaders: Record<string, string> = {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
    };

    try {
        const response = await fetch(url, {
            method: method ?? "GET",
            headers: requestHeaders,
            body: body
                ? requestHeaders["Content-Type"] === "application/json"
                    ? JSON.stringify(body)
                    : (body as string | Buffer | URLSearchParams)
                : undefined,
        });
        if (!response.ok) {
            const errorResponse = (await (
                response.headers.get("Content-Type")?.includes("application/json")
                    ? response.json()
                    : response.text()
            ).catch((error) => {
                throw new ErrorBody(
                    response.status,
                    error && typeof error === "object" && "message" in error
                        ? String((error as { message: unknown }).message)
                        : response.statusText,
                    error && typeof error === "object" && "name" in error
                        ? String((error as { name: unknown }).name)
                        : "Error",
                    error,
                );
            })) as ErrorResponse;

            if (typeof errorResponse === "string") {
                throw new ErrorBody(response.status, errorResponse, "UNEXPECTED_ERROR");
            }

            const getErrorMessage = (err: unknown) => {
                if (err && typeof err === "object" && "message" in err)
                    return String((err as { message: unknown }).message);
                return response.statusText;
            };

            const message = getErrorMessage(errorResponse.error) ?? response.statusText;

            throw new ErrorBody(
                errorResponse.code ?? response.status,
                typeof message === "string" ? message : JSON.stringify(message),
                errorResponse.name ?? "UNEXPECTED_ERROR",
                errorResponse,
            );
        }
        const data = response.headers.get("Content-Type")?.includes("application/json")
            ? await response.json()
            : await response.text();
        return { data, response };
    } catch (error) {
        throw error;
    }
};

export default request;
