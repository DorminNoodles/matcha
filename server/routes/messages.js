// const express = require('express');
// const router = express.Router();
// const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');

// const messages = require('../controllers/messages');
// const jwtToken = require('../services/jwtToken');


// var urlencodedParser = bodyParser.urlencoded({ extended: false })

// router.get('/', urlencodedParser, (req, res) => {

// 	if (!req.token)
// 		res.status(401).send({ status: "error", msg: "access denied !" });

// 	messages.listMessages()
// 		.then((result) => {
// 			res.send(result);
// 		})
// 		.catch((err) => {
// 			res.send(err);
// 		})
// })

// module.exports = router;
