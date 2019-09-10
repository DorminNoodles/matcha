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

	if (!req.token)
		res.status(401).send({ "status": "error", "msg": "bad authentification" });

	chat.new({ from_id: req.token.id, ...req.body })
		.then((response) => { res.status(200).send(response); })
		.catch((err) => { res.status(409).send(err); })
})

module.exports = router;
