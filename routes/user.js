const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const db = require("../models/database")
const errorJson = require("../models/errorJson")
const jwt = require('jsonwebtoken')
const User = require("../models/User")

const key = "e12eI21U1g8rilghi7ghd1D4Y5r9lk3g1d4"

var urlencodedParser = bodyParser.urlencoded({extended : false})

// router.get('/signup/usernameavailable', (req, res) => {
//
// 	if (!req.query.username)
// 		return res.json(errorJson(true, "Username missing"))
//
// 	if (db.state === 'disconnected')
// 		return res.json(errorJson(true, "Database connection failed !"))
//
// 	db.query('SELECT * FROM `users` WHERE `username` = ?',
// 	req.query.username, (err, response, fields) => {
// 		if (response.length != 0)
// 		{
// 			res.json({
// 				"exist": true
// 			})
// 		} else {
// 			res.json({
// 				"exist": false
// 			})
// 		}
// 	}, function(err){
// 		return res.json(errorJson(true, "Query failed !"))
// 	});
// })

// router.get('/', function (req, res){
// 	console.log('pouet')
//     res.setHeader('Content-Type', 'application/json')
// 	res.json({"foo": "bar"})
// })

router.post('/', urlencodedParser, function (req, res){
	if(!req.body)
		return res.send("error")

	console.log(req.body.name)
	let user = new (require("../models/User"))();

	user.saveNewUser(req.body)
	.then(function(result){
		console.log('\x1b[32m%s\x1b[0m', "user saved !")
		res.json(result);
	})
	.catch(function (error){
		console.log('\x1b[31m%s\x1b[0m', error)
		console.log('\x1b[31m%s\x1b[0m', "user not saved !")
		res.json(error);
	})
})

router.get('/:userid', (req, res) => {

	if (!req.params.userid)
		res.json({msg: "error"})
	let token = req.headers['x-access-token']
	let data = {}
	// let token = "24"

	jwt.verify(token, key, function(err, decoded) {

		if (decoded){
			console.log(decoded)

			let user = new User()
			data = user.getData(decoded['id'])
			.then((res) => {
				console.log(res)
			})
			.catch(() => {
				data = {msg : "error"}
				console.log("error")
			})
		}
		// res.json({hello: "hello"})
	})

	// console.log(info);

	// console.log(req.headers['x-access-token'])
	// console.log("here : " + req.params.userid);
	res.json(data)
})

module.exports = router
