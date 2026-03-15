import type { Request } from "express";

export type AuthRequest = Request & {
    user_id?: string;
    ip_address?: string;
    device_name?: string;
    ip_country?: string;
};
