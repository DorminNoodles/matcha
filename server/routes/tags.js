const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const tags = require('../controllers/tags');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/user', urlencodedParser, (req, res) => {

	if (!req.token) {
		res.status(401).send({ "status": "error", "key": "auth", "msg": "bad authentification" });
		return;
	}

	tags.user(req.query)
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err) => {
			res.status(409).send(err);
		})
});

router.get('/', urlencodedParser, (req, res) => {

	if (!req.token) {
		res.status(401).send({ "status": "error", "key": "auth", "msg": "bad authentification" });
		return;
	}

	tags.get(req.body.tag)
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err) => {
			res.status(409).send(err);
		})
});

module.exports = router;