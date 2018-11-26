const EventEmitter = require('events');
const activationMailSubscribe = require('./subscriptions/activationMail');

const testy = require('./testy');


// console.log('papapapapapa');
const emitter = new EventEmitter();

module.exports = emitter;
