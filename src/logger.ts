
import { Appender, ConsoleAppender } from './appender';
import { LogLevel } from './level';

export interface LoggerOptions {
    name?: string;
    timestamps?: boolean;
    appenders?: Appender[];
}

export class Logger {

    private static instace: Logger;
    private options: LoggerOptions;

    public static getLogger(loggerOptions?: LoggerOptions): Logger {
        if (!Logger.instace) {
            this.instace = new Logger(loggerOptions);
        }
        return Logger.instace;
    }

    private constructor(loggerOptions?: LoggerOptions) {
        this.options = loggerOptions || {};

        this.options.timestamps = this.options.timestamps === undefined ? true : this.options.timestamps;
        this.options.appenders = this.options.appenders || [new ConsoleAppender()];
    }

    private log(level: LogLevel, ...args: unknown[]): void {
        for (const appender of this.options.appenders!) {
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
