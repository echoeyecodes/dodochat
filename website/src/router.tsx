import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient } from "@tanstack/react-query";
import { ErrorBody } from "./lib/request/ErrorBody";
import { HTTP_STATUS_CODES } from "./features/common/constants/http-status-codes";

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5,
                retry: (_, error) => {
                    if (error instanceof ErrorBody) {
                        if (error.code === HTTP_STATUS_CODES.UNAUTHORIZED) {
                            if (typeof window !== "undefined") {
                                window.location.href = "/logout";
                                return false;
                            }
                        }
                        return true;
                    }
                    return true;
                },
            },
            mutations: {
                onError: (error) => {
                    if (error instanceof ErrorBody) {
                        if (error.code === HTTP_STATUS_CODES.UNAUTHORIZED) {
                            if (typeof window !== "undefined") {
                                window.location.href = "/logout";
                                return false;
                            }
                        }
                        return true;
                    }
                    return true;
                },
            },
        },
    });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
    if (typeof document === "undefined") {
        return makeQueryClient();
    } else {
        if (!browserQueryClient) {
            browserQueryClient = makeQueryClient();
        }
        return browserQueryClient;
    }
}

export function createRouter() {
    const qc = getQueryClient();
    return createTanStackRouter({
        routeTree,
        context: { queryClient: qc },
    });
}

export function getRouter() {
    return createRouter();
}

declare module "@tanstack/react-router" {
    interface Register {
        router: ReturnType<typeof createRouter>;
    }
}
