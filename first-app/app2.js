// Walking with path built in node Module
// 1. path
const path = require('path');

const aPathObject = path.parse(__filename);
console.log(aPathObject);

// 2. os
const os = require('os');
var totoalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log(`Total Memory: ${totoalMemory}`);
console.log(`Free Memory: ${freeMemory}`);

// 3. files system
// Recall that a node process has a single thread;
// So most of the methods in the file system are dublicated cos of their async counterpart.

const fs = require('fs');

// Lets return all the files/folders in a give directory synchroniouslly.
// const files = fs.readdirSync('./');
// console.log(files);

// Now lets do same but Asynchroniously.
// Note all async methods takes a function as their last argument,Node then call this fucntion when that async operation comepletes. We call this function a "callback"

fs.readdir('./', function (err, myfiles) {
    if (err) console.log(`An error with message: ${err} just occured`);
    else console.log(`The result is: ${myfiles}`);
});