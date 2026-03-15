import type { Response, NextFunction } from "express";
import { UAParser } from "ua-parser-js";
import type { AuthRequest } from "../types/request";

const headerValueToString = (value: string | string[] | undefined) => {
    if (Array.isArray(value)) {
        return value[0];
    }
    return value;
};

const getIPAddress = (req: AuthRequest): string | undefined => {
    return (
        headerValueToString(req.headers["cf-connecting-ip"]) ||
        headerValueToString(req.headers["x-forwarded-for"])?.split(",")[0] ||
        req.socket.remoteAddress
    );
};

const getIPCountry = (req: AuthRequest): string => {
    return headerValueToString(req.headers["cf-ipcountry"]) || "XX";
};

const getDeviceName = (req: AuthRequest) => {
    const userAgent = req.headers["user-agent"];
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    const browser = result.browser.name ?? "Unknown Browser";
    const os = result.os.name ?? "Unknown OS";
    const deviceType = result.device.type;

    if (deviceType === "mobile") {
        return `${browser} on Mobile (${os})`;
    }

    return `${browser} on ${os}`;
};

const attachIPAddress = (req: AuthRequest, _: Response, next: NextFunction) => {
    req.ip_address = getIPAddress(req);
    req.device_name = getDeviceName(req);
    req.ip_country = getIPCountry(req);
    next();
};

export default attachIPAddress;
