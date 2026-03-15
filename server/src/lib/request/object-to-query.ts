const objectToQueryParams = (params: Record<string, unknown>) => {
    const flattenObject = (obj: Record<string, unknown>, prefix = ""): Record<string, unknown> => {
        return Object.keys(obj).reduce((acc: Record<string, unknown>, key: string) => {
            const value = obj[key];
            const propName = prefix ? `${prefix}.${key}` : key;

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
        .filter((key) => {
            const val = flatParams[key];
            return (
                val !== undefined &&
                val !== null &&
                val !== "" &&
                !(Array.isArray(val) && val.length === 0)
            );
        })
        .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(String(flatParams[key])))
        .join("&");

    return queryString ? `?${queryString}` : "";
};

export default objectToQueryParams;
