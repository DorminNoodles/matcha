const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const user = require('../controllers/user');

const router = express.Router();

let urlencodedParser = bodyParser.urlencoded({ extended: false });


router.post('/', urlencodedParser, (req, res) => {

	if (req.files && req.files.avatar)
		req.body.avatar = req.files.avatar;

	user.new(req.body)
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err) => {
			res.status(400).send(err);
		})
})

router.patch('/', urlencodedParser, (req, res) => {

	if (!req.token)
		res.status(401).send({ status: "error", msg: "access denied !" });

	user.update(req.body, req.token.id, req.token)
		.then((result) => { res.status(200).send(result); })
		.catch((err) => { res.status(400).send(err); })
})

router.post('/forgot', urlencodedParser, (req, res) => {
	user.forgot(req.body.email)
		.then((response) => {
			res.status(200).send(response);
		})
		.catch((err) => {
			res.status(500).send({ "status": "error", "msg": "error" });
		})
})

router.put('/password', urlencodedParser, (req, res) => {

	if (!req.token || req.body.key === 0)
		res.status(401).send({ status: "error", msg: "access denied !" });

	user.updatePassword({ ...req.body, id: req.token.id })
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err) => {
			res.status(400).send(err)
		})
})

router.post('/logout', urlencodedParser, (req, res) => {

	if (!req.token)
		res.status(401).send({ status: "error", msg: "access denied !" });

	user.logout(req.token.id)
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err) => {
			res.status(400).send(err);
		})
})

router.get('/confirm', urlencodedParser, (req, res) => {

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
			res.status(500).send(err);
		})
})

router.get('/', urlencodedParser, (req, res) => {
	if (!req.token) {
		res.status(401).send({ "status": "error", "msg": "User Unauthorized" });
		return;
	}

	if (req.query.id) {
		user.get(parseInt(req.query.id), req.token.id)
			.then((user) => {
				res.status(200).send({ ...user });
			})
			.catch(() => {
				res.status(400).send({ "status": "error", "msg": "" });
			})
	}
})




module.exports = router;
