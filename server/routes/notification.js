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

        // notification.listMessages()
		// .then((result) => {
		// 	res.send(result);
		// })
		// .catch((err) => {
		// 	res.send(err);
		// })
})
