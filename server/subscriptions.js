const myEmitter = require('./myEmitter');
const sendEmailOnRegistration = require('./sendEmailOnRegistration');
const anotherListener = require('./anotherListener');

myEmitter.on('user-registered', sendEmailOnRegistration);
myEmitter.on('user-registered', anotherListener);
