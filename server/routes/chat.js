const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const chat = require('../controllers/chat');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/', urlencodedParser, (req, res) => {

	if (!req.token)
		res.status(401).send({ "status": "error", "msg": "bad authentification" });

	chat.new({ from_id: req.token.id, ...req.body })
		.then((response) => { res.status(200).send(response); })
		.catch((err) => { res.status(409).send(err); })
})

router.get('/', urlencodedParser, (req, res) => {
	if (!req.token)
		res.status(401).send({ "status": "error", "msg": "bad authentification" });

	chat.get(req.token.id, req.query.id)
		.then((response) => { res.status(200).send(response); })
		.catch((err) => { res.status(409).send(err); })
})

router.get('/list', urlencodedParser, (req, res) => {
	if (!req.token)
		res.status(401).send({ "status": "error", "msg": "bad authentification" });

	chat.list(req.token.id)
		.then((response) => { res.status(200).send(response); })
		.catch((err) => { res.status(400).send(err); })
})

router.post('/visit', urlencodedParser, (req, res) => {

	if (!req.token)
		res.status(401).send({ "status": "error", "msg": "bad authentification" });

	chat.visit(req.body.group_id)
		.then((response) => { res.status(200).send(response); })
		.catch((err) => { res.status(400).send(err); })
})

module.exports = router;
