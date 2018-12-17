const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const user = require('../controllers/user');

const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended : false})

router.post('/register', urlencodedParser, (req, res) => {
	user.register(req.body)
	.then((resolve)=>{
		console.log(resolve);
	}).catch((error)=>{
		console.log(error);
	})
	console.log('User created !')
	res.send('Create User');
})

router.get('/profil/:id', urlencodedParser, (req, res) => {

	console.log(req.params);
	res.send('Get profil');
})

router.post('/authenticate', urlencodedParser, (req, res) => {

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

module.exports = router;
