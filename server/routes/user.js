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
	user.authenticate(req, res);
})

module.exports = router;
