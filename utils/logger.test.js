const Logger = require('./logger');

describe('Logger Tests', () => {
    it('shoud save service with uppercase', () => {
        const service = 'MyService';
        const logger = new Logger(service);

        expect(logger.service).toBe('MYSERVICE');
    });

    it('testing logger log function', () => {
        global.console = {
            log: jest.fn(),
        };

        const service = 'MyService';
        const message = 'test message';

        const logger = new Logger(service);
        logger.log(message);

        expect(global.console.log).toHaveBeenCalledWith('[MYSERVICE] test message');
    });
});