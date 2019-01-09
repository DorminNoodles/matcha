const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const user = require('../controllers/user');

const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended : false})

router.post('/register', urlencodedParser,async (req, res) => {
	user.new(req.body)
	.then((resolve)=>{
		console.log(resolve);
	}).catch((error)=>{
		console.log(error);
	})
	res.send('Create User');
})

router.get('/profil/:id', urlencodedParser, (req, res) => {
	console.log(req.params);
	user.find(req.params)
	.then((resolve)=>{
		console.log(resolve);
	}).catch((error)=>{
		console.log(error);
	})
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
		console.log(error);
		res.send({
			status: 'error',
			message: ''
		});
	})

})

module.exports = router;
