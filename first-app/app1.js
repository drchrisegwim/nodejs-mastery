//console.log(module);

// To load a module we use the "required" function that takes one argument as shown below:

const logger = require('./logger1');
console.log(logger);

// Now intelisense will already have methos defind on the logger module, so to use it do:

logger.emeksenseLog('database about to get full o!!!');
logger.log('Your server timed out');

// To rename a variable accross board highlight it and press f2.

// NOte node uses an immediately invoked function (known as IFFI) as a wrapper function to all the modules (file) in your project. So node doesnt execute our codes directly.