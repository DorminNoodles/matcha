const express = require('express');
const bodyParser = require('body-parser');
const user = require('./routes/user');
const emitter = require('./emitter');
const activationMail = require('./services/activationMail');

const activationMail = require('./services/activationMail');
const sendMail = new activationMail();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/user', user);


app.listen(3000);
