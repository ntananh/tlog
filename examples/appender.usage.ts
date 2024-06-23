import { Logger } from '../src';
import { FileAppender } from '../src/appender';

const fileAppender = new FileAppender({ path: 'logs/app.log' });

const logger = new Logger();

logger.trace('Trace message');
logger.debug('Debug message');
logger.info('Info message');
logger.warn('Warn message');
logger.error('Error message');

logger.info('Log the object', {
    foo: 'baz'
});