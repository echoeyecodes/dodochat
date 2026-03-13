import envConfig from "@/lib/env";

export function withCDN(url: string | undefined): string {
    if (!url) return '';

    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')) {
        return url;
    }

    if (!url.startsWith('/') && url.includes('.') && (!url.includes('/') || url.indexOf('.') < url.indexOf('/'))) {
        return `https://${url}`;
    }

    const baseUrl = envConfig.get('CDN_URL')?.replace(/\/$/, '') || '';
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;

    return `${baseUrl}${cleanUrl}`;
}
