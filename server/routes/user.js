const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const user = require('../controllers/user');
const UserSettings = require('../services/user');

const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended : false})

router.post('/register', urlencodedParser, (req, res) => {
	user.new(req.body)
	.then((result) => {
		res.status(200).send({"status": "success", "msg": "user registered !"});
	})
	.catch((err) => {
		res.send(err);
	});
})

router.post('/authenticate', urlencodedParser, (req, res) => {
	console.log("fuck");
	console.log(req.body.username);
	console.log(req.body.password);
	user.authenticate(req.body)
	.then((resolve) => {
		res.send({
			status: 'ok',
			message: 'connected !',
			token: resolve
		});
		console.log('connected !');
	}).catch((error) => {
		console.log('error');
		console.log(error);
		res.send({
			status: 'error',
			message: error
		});
	})
})

router.post('/forgot', urlencodedParser, (req, res) => {
	user.forgot(req.body.email)
	.then(() => {
		res.status(200).send({"status": "success"});
	})
	.catch((err) => {
		res.send("error");
		console.log(err);
	})
})

router.put('/password', urlencodedParser, (req, res) => {
	console.log(req.body);
	user.updatePassword(req.body.token, req.body.password, req.body.confirmPassword)
	.then((res) => {
		res.status(200).send({"status": "success"});
	})
	.catch((err) => {
		res.status(400).send({"status": "error"});
	})
})

router.post('/settings', urlencodedParser, (req, res) => {
	const data = req.body;
	user.find(data)
	.then((res) => {
		let userSettings = new UserSettings();
		userSettings.checkSettings(res.id, data)
		.then(() => {
			console.log("> Profile modified.");
		})
		.catch(() => {
			console.log("NOPE 1");
		})
	}).catch((error) => {
		console.log("NOPE 2");
		res.send("error");
	})
})

router.put('/user/:id', urlencodedParser, (req, res) => {
	console.log(req.params);
})

router.get('/confirm', urlencodedParser, (req, res) => {

	console.log(req.query.key);

	if (req.query.key) {
		user.activate(req.query.key)
		.then(() => {
			res.status(200).send({"status": "success", "msg": "User Activate"});
		})
		.catch(() => {
			res.status(500).send({"status": "error", "msg": "error"});
		})
	}
	else {
		res.status(400).send({"status": "error", "msg": "bad request"});
	}
})

module.exports = router;
