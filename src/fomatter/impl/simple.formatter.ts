import { DEFAULT_LOG_LEVEL_COLORS, colorize, getTimeStamp, isError, safeStringify } from "../../utils";
import { Formatter, FormatterConfig } from "../formatter";
import { formatError } from "../utils/error.formatter";

export class SimpleFormatter implements Formatter {

    format({ level, args, options }: FormatterConfig): string {
        const { name, timestamp } = options || {};

        let prefix: string = '';
        prefix += timestamp ? `[${getTimeStamp(timestamp)}] ` : '';
        prefix += `${colorize(DEFAULT_LOG_LEVEL_COLORS[level], level)}`;
        prefix += name ? ` [${name}]` : '';

        const message: string = this.parse(args);

        return `${prefix}${message.length ? ' ' : ''}${message}`;
    }

    parse(args: unknown[]): string {
        return args.reduce((acc: string, arg: unknown) => {
            let argString = arg;

            if (typeof arg === 'object') {
                const argObject = arg as Object;

                if (isError(arg)) {
                    argString = formatError(arg as Error);
                } else if (Object.keys(argObject).length > 0) {
                    argString = safeStringify(argObject);
                } else {
                    return acc;
                }
            }
            return (acc += acc.length ? `\n${argString}` : `${argString}`);
        }, '') as string;
    }
}

