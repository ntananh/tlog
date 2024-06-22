import { LogLevel } from "../level";

export interface FormatterConfig {
    level: LogLevel;
    args: any[];
    options?: {
        name?: string;
        timestamp?: Date;
    };
}

export interface Formatter {
    format(config: FormatterConfig): string;
}