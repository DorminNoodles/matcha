const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const user = require('../controllers/user');

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
	// user.new(req.body)
	// .then((resolve)=>{
	// 	console.log(resolve);
	// }).catch((error)=>{
	// 	console.log(error);
	// })
	// console.log('User created !')
	res.send('Get profil');
})

// router.get('/createUser', urlencodedParser, (req, res) => {
// 	res.send('Create User');
// })

module.exports = router;
