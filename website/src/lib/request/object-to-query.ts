export const objectToQueryParams = (params: Record<string, unknown>) => {
    const flattenObject = (obj: Record<string, unknown>, prefix = ""): Record<string, unknown> => {
        return Object.keys(obj).reduce((acc: Record<string, unknown>, key: string) => {
            const propName = prefix ? `${prefix}.${key}` : key;
            const value = obj[key];
            if (typeof value === "object" && value !== null) {
                if (Array.isArray(value)) {
                    acc[propName] = value.join(",");
                } else {
                    Object.assign(acc, flattenObject(value as Record<string, unknown>, propName));
                }
            } else {
                acc[propName] = value;
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
                !(Array.isArray(flatParams[key]) && flatParams[key].length === 0),
        )
        .map(
            (key) =>
                encodeURIComponent(key) +
                "=" +
                encodeURIComponent(flatParams[key] as string | number | boolean),
        )
        .join("&");

    return queryString ? `?${queryString}` : "";
};
