const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const User = require('../models/User')

var urlencodedParser = bodyParser.urlencoded({extended : false})

router.post("/", urlencodedParser, function(req,res){

	let user = new User();

	user.connection(req.body.username, req.body.password)
	.then((resConnect) => {
		console.log(resConnect);
		res.json({token : resConnect});
	})
	.catch(()=>{
		res.send("error of connection")
	})
})

module.exports = router
