const express = require('express');
const bodyParser = require('body-parser');

const users = require('../controllers/users');

const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended : false})

router.get('/', urlencodedParser, (req, res) => {
	
	if (!req.token) {
		res.status(401).send({"status": "error", "key": "token", "msg": "token missing"});
		return;
	}

	users.getUsers(req.query, req.token.id)
	.then((data) => {
		res.send(data);
	})
	.catch((err) => {
		console.log('users route error > ', err);
		res.status(404).send({"status": "error", "key": err.key, "msg": err.msg});
	})
})

module.exports = router;
