import { Logger } from '../src';

const logger = new Logger();

logger.trace('Trace message');
logger.debug('Debug message');
logger.info('Info message');
logger.warn('Warn message');
logger.error('Error message');

logger.info('Log the object', {
    foo: 'baz'
});