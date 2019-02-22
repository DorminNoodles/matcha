const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const visit = require("../controllers/visit");

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.post('/', urlencodedParser, (req, res) => {
	if (!req.token) {
		res.status(401).send({"status": "error", "msg": "bad authentification"});
	}
	else {
		visit.new({user_id: req.token.id, his_id: req.body.his_id});
		res.status(200).send({"status": "success", "msg": "visit saved !"});
	}
})

router.get('/', urlencodedParser, (req, res) => {
	if (!req.token) {
		res.status(401).send({"status": "error", "msg": "bad authentification"});
	}
	else {
		visit.getVisits({user_id: req.token.id})
		.then((result) => {
			console.log("OK !");
			res.status(200).send(result);
		})
		.catch((err) => {
			res.status(500).send({"status": "error", "msg": "server error"});
		})
	}
})

module.exports = router;
