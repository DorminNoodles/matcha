const EventEmitter = require('events');

console.log("create emitter");
const emitter = new EventEmitter();

emitter.hello = 8;

module.exports = emitter;
