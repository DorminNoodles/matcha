const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const block = require('../controllers/block');

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.post('/', urlencodedParser, (req, res) => {
	if (!req.token) {
		res.status(401).send({"status": "error", "msg": "bad authentification"});
		return;
	}
	if (!req.body.liker || req.token.id != req.body.liker) {
		res.status(403).send({"status": "error", "msg": "access refused"});
		return;
	}
	likes.new(req.body.liker, req.body.liked)
	.then((result) => {
		res.send(result);
	})
	.catch((err) => {
		res.send(err);
	});
})
