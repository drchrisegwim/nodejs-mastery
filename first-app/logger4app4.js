const EventEmitter = require('events');

class Logger extends EventEmitter {
    // When a function is inside a class it known as method
    log(messgae) {
        console.log(messgae);

        this.emit('event', {
            data: 'Payload'
        });
    }
}


module.exports = Logger;