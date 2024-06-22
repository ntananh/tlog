import { Logger } from '../src';
import { ConsoleAppender, FileAppender } from '../src/appender';

const fileAppender = new FileAppender({ path: 'logs/app.log' });

const logger = new Logger({
    appender: [new ConsoleAppender(), fileAppender]
});


logger.debug('test');
logger.debug('test second');