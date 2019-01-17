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

router.get('/recent', urlencodedParser, (req, res) => {
	console.log(req.param);
	console.log(req.params);
})

module.exports = router;
