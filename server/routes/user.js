const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const user = require('../controllers/user');

const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, 'uploads/')
	},
	filename: function (req, file, callback) {
		callback(null, file.fieldname + '-' + Date.now() + '.jpg')
	}
})

var upload = multer({ storage: storage });

router.post('/', upload.single('avatar'), urlencodedParser, (req, res) => {

	if (!req.file || !req.file.filename) {
		res.status(400).send({"status": "error", "key": "avatar", "msg": "missing avatar"});
	}
	else {
		req.body.avatar = {
			"name": req.file.filename
		}
		user.new(req.body)
		.then((result) => {
			res.status(200).send({"status": "success", "msg": "user registered !"});
		})
		.catch((err) => {
			res.status(500).send({"status": "error", "key": err.key, "msg": err.msg});
		})
	}
})

router.post('/authenticate', urlencodedParser, (req, res) => {
	user.authenticate(req.body)
	.then((resolve) => {
		res.status(200).send({
			status: 'ok',
			message: 'connected !',
			token: resolve.token,
			user: resolve.user
		});
		console.log('connected !');
	}).catch((error) => {
		console.log('error');
		console.log(error);
		res.status(500).send(error);
	})
})

router.post('/forgot', urlencodedParser, (req, res) => {
	user.forgot(req.body.email)
		.then(() => {
			res.status(200).send({ "status": "success" });
		})
		.catch((err) => {
			res.status(500).send({ "status": "error", "msg": "error" });
			console.log(err);
		})
})

router.put('/password', urlencodedParser, (req, res) => {
	user.updatePassword(req.body.token, req.body.password, req.body.confirmPassword)
		.then((result) => {
			res.status(200).send({ "status": "success" });
		})
		.catch((err) => {
			res.status(400).send({ "status": "error", "msg": err.msg });
		})
})


router.get('/confirm', urlencodedParser, (req, res) => {

	console.log(req.query.key);

	if (req.query.key) {
		user.activate(req.query.key)
			.then(() => {
				res.status(200).send({ "status": "success", "msg": "User Activate" });
			})
			.catch(() => {
				res.status(500).send({ "status": "error", "msg": "error" });
			})
	}
	else {
		res.status(400).send({ "status": "error", "msg": "bad request" });
	}
})

router.get('/avatar', urlencodedParser, (req, res) => {
	user.getAvatar(req.query.id)
		.then((filename) => {
			var img = require('fs').readFileSync(filename);
			res.writeHead(200, { 'Content-Type': 'image/jpeg' });
			res.end(img, 'binary');
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		})
})

module.exports = router;
