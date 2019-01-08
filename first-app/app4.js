const Logger = require('./logger4app4');
const logger = new Logger();

logger.on('event', (eventArg) => {
    console.log('Event Registered', eventArg);
});


logger.log('My name is Christian Egwim');