const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const user = require('../controllers/user');

const mysql = require('promise-mysql');

var urlencodedParser = bodyParser.urlencoded({extended : false})

router.post('/createUser', urlencodedParser, (req, res) => {
	user.new(req.body)
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
		console.log('connected !');
	})

	res.send('hello');
})

// router.post('/test/connection', urlencodedParser, (req, res) => {
//
// 	console.log(req);
//
// 	res.send('hello');
// })



// router.get('/createUser', urlencodedParser, (req, res) => {
// 	res.send('Create User');
// })



module.exports = router;
