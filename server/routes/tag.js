const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const tag = require('../controllers/tag');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/', urlencodedParser, (req, res) => {

	if (!req.token) {
		res.status(401).send({ "status": "error", "key": "auth", "msg": "bad authentification" });
		return;
	}

	tag.new(req.body.tag, req.token.id)
		.then((result) => { res.status(200).send(result); })
		.catch((err) => { res.status(200).send(err); })
});

router.get('/', urlencodedParser, (req, res) => {
	if (!req.token) {
		res.status(401).send({ "status": "error", "key": "auth", "msg": "bad authentification" });
		return;
	}

	tag.get(req.body.tag)
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err) => {
			res.status(409).send(err);
		})
});

router.delete('/', urlencodedParser, (req, res) => {

	if (!req.token || parseInt(req.body.user_id) !== req.token.id) {
		res.status(401).send({ "status": "error", "key": "auth", "msg": "bad authentification" });
		return;
	}

	tag.delete(req.body)
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err) => {
			res.status(409).send(err);
		})
});

module.exports = router;
