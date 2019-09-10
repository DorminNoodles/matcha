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
		res.status(200).send({"status": "success", "msg": "user registered !"});
	})
	.catch((err) => {
		res.status(500).send({"status": "error", "key": err.key, "msg": err.msg, 'data': err});
	})
})

router.patch('/', urlencodedParser, (req, res) => {

	if (!req.token)
		res.status(401).send({ status: "error", msg: "access denied !"});

	user.update(req.body, req.token.id)
	.then((result) => {
		res.status(200).send(result);
	})
	.catch((err) => {
		res.status(err.code).send({status: "error", msg: err.msg, data: err.data});
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

	if (req.query.id) {
		user.get(parseInt(req.query.id), req.token.id)
		.then((user) => {
			res.status(200).send({...user});
		})
		.catch(() => {
			res.status(400).send({ "status": "error", "msg": "" });
		})
	}
})




module.exports = router;
