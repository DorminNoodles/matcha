const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const user = require('../controllers/user');

const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended : false})

router.post('/register', urlencodedParser, (req, res) => {
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
	// user.new(req.body)
	// .then((resolve)=>{
	// 	console.log(resolve);
	// }).catch((error)=>{
	// 	console.log(error);
	// })
	// console.log('User created !')
	res.send('Get profil');
})

router.patch('/profil/:id', urlencodedParser, (req, res) => {


	res.send('Update Profil');
})

router.get('/login', urlencodedParser, (req, res) => {

	res.send('Connect user give him jwt');
})

// router.get('/createUser', urlencodedParser, (req, res) => {
// 	res.send('Create User');
// })

module.exports = router;
