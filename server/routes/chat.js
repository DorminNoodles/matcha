const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const chat = require('../controllers/chat');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', urlencodedParser, (req, res) => {
	console.log("chat route");
	console.log(req.body);
	chat.chatSubscribe(req.body.userID)
		.then(() => {
			console.log("then");
		})

	chat.chatSubscribe(req.body.userID)


	res.send("chut");
})

router.post('/', urlencodedParser, (req, res) => {
	console.log(req.body)

	res.status(200).send("chut");
})

module.exports = router;
