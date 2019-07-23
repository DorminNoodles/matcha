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

	req.body.avatar = {
		"name": '',
		"file": ''
	}

	if (req.file && req.file.filename) {
		req.body.avatar = {
			"name": req.file.filename,
			"file": req.file
		}
	}

	user.new(req.body)
	.then((result) => {
		res.status(200).send({"status": "success", "msg": "user registered !"});
	})
	.catch((err) => {
		res.status(500).send({"status": "error", "key": err.key, "msg": err.msg, 'data': err});
	})
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

router.get('/', urlencodedParser, (req, res) => {
	if (!req.token){
		res.status(401).send({ "status": "error", "msg": "User Unauthorized" });
		return;

	}
	// console.log(!req.params.userId);
	if (!req.params.userId) {
		user.get(req.token.id)
		.then((user) => {
			console.log(user);
			res.status(200).send({...user});
		})
		.catch(() => {
			res.status(400).send({ "status": "error", "msg": "" });
		})
	}
})

module.exports = router;
