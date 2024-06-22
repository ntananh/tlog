
import { Appender, ConsoleAppender } from './appender';
import { LogLevel } from './level';

export interface LoggerOptions {
    name?: string;
    timestamps?: boolean;
    appender?: Appender[];
}

export class Logger {

    constructor(loggerOptions?: LoggerOptions) {
        this.options = loggerOptions || {};

        // Default timestamp to be true if not provided
        this.options.timestamps = this.options.timestamps === undefined ? true : this.options.timestamps;
        this.options.appender = this.options.appender || [new ConsoleAppender()];

        // Override default log level colors if provided
    }

    private options: LoggerOptions;

    private log(level: LogLevel, ...args: unknown[]) {
        for (const appender of this.options.appender!) {
            const formattedLog = appender.options.formatter!.format({
                level,
                args,
                options: {
                    name: this.options.name || undefined,
                    timestamp: this.options.timestamps ? new Date() : undefined
                }
            });
            appender.append({ message: formattedLog });
        }
    }

    trace(...args: unknown[]) {
        this.log(LogLevel.TRACE, ...args);
    }

    debug(...args: unknown[]) {
        this.log(LogLevel.DEBUG, ...args);
    }

    info(...args: unknown[]) {
        this.log(LogLevel.INFO, ...args);
    }

    warn(...args: unknown[]) {
        this.log(LogLevel.WARN, ...args);
    }

    error(...args: unknown[]) {
        this.log(LogLevel.ERROR, ...args);
    }
}
