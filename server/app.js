const express = require('express');
const bodyParser = require('body-parser');
const user = require('./routes/user');
const emitter = require('./emitter');

const activationMail = require('./services/activationMail');

const app = express();

console.log(emitter.hello);

emitter.hello = 9;
// let test = new activationMail();

// emitter.on('userRegistered', activationMail.sendActivationMail);


// activationMail.displayMessage();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/user', user);


app.listen(3000);
