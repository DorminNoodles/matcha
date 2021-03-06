const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const likes = require('../controllers/likes');


var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/', urlencodedParser, (req, res) => {
	if (!req.token) {
		res.status(401).send({ "status": "error", "msg": "bad authentification" });
		return;
	}

	likes.new(req.token.id, parseInt(req.body.id))
		.then((result) => { res.send(result); })
		.catch((err) => { res.send(err); });
})

router.delete('/', urlencodedParser, (req, res) => {
	if (!req.token) {
		res.status(401).send({ "status": "error", "msg": "bad authentification" });
		return;
	}

	likes.delete(req.token.id, req.body.id)
		.then((result) => { res.status(200).send(result); })
		.catch(() => { res.status(409).send({ "status": "error", "msg": "unlike failed !" }) })
})

module.exports = router;
