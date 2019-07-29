const express = require('express');
const bodyParser = require('body-parser');

const user = require('../controllers/user');

const router = express.Router();

let urlencodedParser = bodyParser.urlencoded({ extended: false });


router.post('/', urlencodedParser, (req, res) => {
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
		console.log(error);
		res.status(500).send(error);
	})
})
