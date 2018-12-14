const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const messages = require('../services/messages.js');

var urlencodedParser = bodyParser.urlencoded({extended : false})

router.post('/', urlencodedParser, (req, res) => {

	console.log('save message in db');
	console.log('create new notif');
	console.log('(service notif check if user connected and save )');

})
