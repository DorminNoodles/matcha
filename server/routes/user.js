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
		res.send('hello');
	})
	.catch((err) => {
		res.send("error");
		console.log(err);
	})
})

router.get('/forgot', urlencodedParser, (req, res) => {
	console.log(req.query.key);
	user.recog(req.query.key);
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
			console.log("NOPE");
		})
	}).catch((error) => {
		console.log("NOPE");
		res.send("error");
	})
})

router.put('/user/:id', urlencodedParser, (req, res) => {
	console.log(req.params);
})

module.exports = router;
