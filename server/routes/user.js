const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const user = require('../controllers/user');

const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended : false})

router.post('/', urlencodedParser, (req, res) => {
	console.log('post likes');
	console.log(req.body);
	likes.new(req.body.liker, req.body.liked)
	.then((result) => {
		res.send(result);
	})
	.catch((err) => {
		res.send(err);
	});
})
	console.log(req.params);
	res.send('Get profil');
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

router.put('/user/:id', urlencodedParser, (req, res) => {
	console.log(req.params);

})
module.exports = router;
