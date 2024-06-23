import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { LogMessage } from "../../message";
import { Appender, AppenderOptions } from "../appender";

type LOG_ROTATION = 'daily' | 'weekly' | 'monthly';

export interface FileAppenderOptions extends AppenderOptions {
    path: string;
    logRotation?: LOG_ROTATION;
}

export class FileAppender extends Appender {
    constructor(private readonly fileOptions: FileAppenderOptions) {
        super(fileOptions);
        this.ensureDirectoryExists(this.fileOptions.path);
    }

    append(logMessage: LogMessage): void {
        try {
            const filePath = this.getFilePath();
            writeFileSync(filePath, `${logMessage.message}\n`, { flag: 'a' });
        } catch (error) {
            console.error('Failed to write log message to file:', error);
        }
    }

    private getFilePath(): string {
        const { path, logRotation } = this.fileOptions;

        if (!logRotation) {
            return path;
        }

        const date = new Date();
        let rotatedPath: string;

        switch (logRotation) {
            case 'daily':
                rotatedPath = join(
                    path,
                    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}.log`
                );
                break;
            case 'weekly':
                const weekNumber = Math.ceil(date.getDate() / 7);
                rotatedPath = join(
                    path,
                    `${date.getFullYear()}-W${weekNumber}.log`
                );
                break;
            case 'monthly':
                rotatedPath = join(
                    path,
                    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}.log`
                );
                break;
            default:
                rotatedPath = path;
        }

        this.ensureDirectoryExists(rotatedPath);
        return rotatedPath;
    }

    private ensureDirectoryExists(filePath: string): void {
        const dir = dirname(filePath);
        if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
        }
    }
}
