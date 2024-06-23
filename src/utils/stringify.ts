export const safeStringify = (object: any): string => {
    if (object instanceof Error) {
        return stringify({
            message: object.toString(),
            stack: object.stack,
        });
    } else if (object && object.asStringifyObject) {
        return stringify(object.asStringifyObject());
    } else if (typeof object === 'object') {
        return stringify(object);
    } else if (object === null) {
        return 'null';
    } else if (object === undefined) {
        return 'undefined';
    } else {
        return `${object}`;
    }
}

const stringify = (object: any): string => {
    const seen: unknown[] = [];
    const circularReplacer = () => {
        return (key: string, value: unknown) => {
            if (typeof value === 'object' && value !== null) {
                if (seen.indexOf(value) >= 0) {
                    return `[Circular ~]`;
                }
                seen.push(value);
        }
            return value;
        };
    };
    return JSON.stringify(object, circularReplacer());
}
