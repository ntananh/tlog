import { Formatter, SimpleFormatter } from '../fomatter';
import { LogMessage } from '../message';

export interface AppenderOptions {
    formatter?: Formatter;
}

export abstract class Appender {
    public options: AppenderOptions;

    constructor(options?: AppenderOptions) {
        this.options = options || {};
        this.options.formatter = this.options.formatter || new SimpleFormatter();
    }

    abstract append(log: LogMessage): void;
}

