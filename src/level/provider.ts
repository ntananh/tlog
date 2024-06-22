import { LogLevel } from './level';

export interface LogLevelProvider {
    logLevel(name: string): LogLevel;
}

