const EventEmitter = require('events');
const activationMailSubscribe = require('./subscriptions/activationMail');
const emitter = new EventEmitter();


module.exports = emitter;
