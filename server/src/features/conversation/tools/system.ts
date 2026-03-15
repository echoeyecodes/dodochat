import { tool } from "ai";
import { z } from "zod";
import process from "node:process";

export const systemTools = {
    getSystemInfo: tool({
        description:
            "Get technical metrics about the system (CPU, memory, uptime, node version). Use ONLY when explicitly asked for system stats.",
        inputSchema: z.object({}),
        outputSchema: z.object({
            node_version: z.string(),
            platform: z.string(),
            arch: z.string(),
            uptime: z.number(),
            memory_usage: z.object({
                rss: z.string(),
                heap_total: z.string(),
                heap_used: z.string(),
                external: z.string(),
            }),
            cpu_usage: z.object({
                user: z.number(),
                system: z.number(),
            }),
            pid: z.number(),
        }),
        execute: async () => {
            const usage = process.memoryUsage();
            return {
                node_version: process.version,
                platform: process.platform,
                arch: process.arch,
                uptime: Math.floor(process.uptime()),
                memory_usage: {
                    rss: `${Math.round((usage.rss / 1024 / 1024) * 100) / 100} MB`,
                    heap_total: `${Math.round((usage.heapTotal / 1024 / 1024) * 100) / 100} MB`,
                    heap_used: `${Math.round((usage.heapUsed / 1024 / 1024) * 100) / 100} MB`,
                    external: `${Math.round((usage.external / 1024 / 1024) * 100) / 100} MB`,
                },
                cpu_usage: process.cpuUsage(),
                pid: process.pid,
            };
        },
    }),
};
