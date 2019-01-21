const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const user = require('../controllers/user');

const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended : false})

router.post('/register', urlencodedParser,async (req, res) => {
	// console.log(eq.headers['x-forwarded-for']);

	user.new(req.body)
	.then((resolve)=>{
		console.log(resolve);
	}).catch((error)=>{
		console.log(error);

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
