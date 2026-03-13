export const objectToQueryParams = (params: Record<string, any>) => {
    const flattenObject = (obj: any, prefix = ""): Record<string, any> => {
        return Object.keys(obj).reduce((acc: Record<string, any>, key: string) => {
            const propName = prefix ? `${prefix}.${key}` : key;
            if (typeof obj[key] === "object" && obj[key] !== null) {
                if (Array.isArray(obj[key])) {
                    acc[propName] = obj[key].join(",");
                } else {
                    Object.assign(acc, flattenObject(obj[key], propName));
                }
            } else {
                acc[propName] = obj[key];
            }
            return acc;
        }, {});
    };

    const flatParams = flattenObject(params);
    const queryString = Object.keys(flatParams)
        .filter(
            (key) =>
                flatParams[key] !== undefined &&
                flatParams[key] !== null &&
                flatParams[key] !== "" &&
                !(Array.isArray(flatParams[key]) && flatParams[key].length === 0)
        )
        .map(
            (key) =>
                encodeURIComponent(key) + "=" + encodeURIComponent(flatParams[key])
        )
        .join("&");

    return queryString ? `?${queryString}` : "";
};
