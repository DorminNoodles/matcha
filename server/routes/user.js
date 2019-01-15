const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const user = require('../controllers/user');

const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended : false})

router.post('/register', urlencodedParser,async (req, res) => {
	// console.log(eq.headers['x-forwarded-for']);

	var ip = req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);

	 console.log(ip);
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
	user.authenticate(req, res);
})

router.post('/forgot', urlencodedParser, (req, res) => {
	user.forgot(req, res);
})

module.exports = router;
