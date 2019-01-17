const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const messages = require('../controllers/messages');
const jwtToken = require('../services/jwtToken');


var urlencodedParser = bodyParser.urlencoded({extended : false})

router.post('/', urlencodedParser, (req, res) => {

	console.log(req.body);
	console.log(req.body.from);

	messages.new({
		from : req.body.from,
		to: req.body.to,
		body: req.body.body
	})
	.then(() => {

	})
	.catch(() => {

	})
	res.send('pouet');

})

router.get('/recent/:from_id/:to_id', urlencodedParser, (req, res) => {
	// console.log(req.param);
	console.log(req.params);

	messages.getRecentsMessages({from: req.params.from_id, to: req.params.to_id})
	.then((result) => {
		res.send(result);
	})
	.catch((err) => {
		res.send(err);
	})

})

module.exports = router;
