# tlog

A simple implementation for logging library.

# Usage

## Basic usage

``` typescript
const logger = new Logger();

logger.trace('Trace message');
logger.debug('Debug message');
logger.info('Info message');
logger.warn('Warn message');
logger.error('Error message');

logger.info('Log the object', {
    foo: 'baz'
});
```

## Log Appender

- Appenders serialise log events to some form of output. They can write to files, outputs to console.

- The library provides 2 log appenders:

    - **Console Appender**   : This appender outputs log messages to the console.

    - **File Appender**      : This appedner outputs log message to a file (as requirement).

### Logger config parameters

- name (string): The name of the logger. 

- timestamps (Boolean): Whether to include timestamps in logs (default: true) 

- appenders: Array of appenders to process and log the data. (default: [ConsoleAppender]) 

### Log Appender Usage

```typescript
// Initialize the console logger
const consoleAppender = new ConsoleAppender();

/*
  - The file appender will create 'logs/app.log' if it doesn't exist.
  - If 'logs/app.log' exists, it will append new logs to the file.
  - Log rotation options can be provided to the file appender to automatically
    rotate the log file based on date.
*/
const fileAppender = new FileAppender({ path: 'logs/app.log' });

// Set up the logger with both console and file appenders
const logger = new Logger({
  appenders: [consoleAppender, fileAppender]
});

/*
  The logger will use both appenders:
  - The console appender outputs log messages to the console.
  - The file appender writes log messages to 'logs/app.log'.
*/
logger.info('Information log message');
```

### Create custom log appender

Can add multiple appenders to a single logger, so that log messages can be sent to multiple outputs.

You can also create custom log appenders by extending the `Appender` class as shown below:

```typescript
export class CustomAppender extends Appender {
  constructor() {
    super();
  }

  handle(config: AppenderConfig) {
    console.log([`[CustomAppender] - ${config.message}`]);
  }
}
```
> **Note:** You can also create custom log formatters by implementing the `Formatter` interface.
