import { LogMessage } from "../../message";
import { Appender, AppenderOptions } from "../appender";

export interface ConsoleAppenderOptions extends AppenderOptions {
    fullFormat?: boolean;
}

export class ConsoleAppender extends Appender {
    constructor(private readonly consoleOptions?: ConsoleAppenderOptions) {
        super(consoleOptions);

        this.consoleOptions = consoleOptions || {};
        this.consoleOptions.fullFormat = this.consoleOptions.fullFormat ?? true;
    }

    public append({ message }: LogMessage) {
        if (!this.consoleOptions?.fullFormat) {
            message = message.split('\n')[0];
        }
        console.log(message);
    }
}

