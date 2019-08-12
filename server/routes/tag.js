const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const tag = require('../controllers/tag');



var urlencodedParser = bodyParser.urlencoded({extended: false});

router.post('/', urlencodedParser, (req, res) => {
	
	if (!req.token) {
		res.status(401).send({"status": "error", "key": "auth", "msg": "bad authentification"});
		return;
	}

	console.log("add new tag")
	console.log("reqbody", req.body)
	console.log("reqtoken", req.token)
	tag.new(req.body.tag, req.token.id)
	.then((result) => {
		res.status(200).send(result);
	})
	.catch((err) => {
		res.status(409).send(err);
	})
});

router.get('/', urlencodedParser, (req, res) => {
	if (!req.token) {
		res.status(401).send({"status": "error", "key": "auth", "msg": "bad authentification"});
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

module.exports = router;
