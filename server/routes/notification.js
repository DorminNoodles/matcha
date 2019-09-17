const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const notification = require('../controllers/notification');
const jwtToken = require('../services/jwtToken');


var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', urlencodedParser, (req, res) => {

	if (!req.token)
		res.status(401).send({ status: "error", msg: "access denied !" });

	notification.get()
		.then((response) => { res.status(200).send(response); })
		.catch((err) => { res.status(400).send(err); })
})

router.post('/', urlencodedParser, (req, res) => {

	if (!req.token)
		res.status(401).send({ status: "error", msg: "access denied !" });

	notification.new()
		.then((response) => { res.status(200).send(response); })
		.catch((err) => { res.status(400).send(err); })
})

module.exports = router;