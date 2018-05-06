const express = require('express');
const bodyParser = require('body-parser');
// const signup = require('./routes/signup');
const user = require('./routes/user');
const Fortest = require('./models/Fortest')


const app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use('/api/user', user);

app.get('/', function (req, res){
	res.send('api available');
});


app.get('/fortest', function (req, res){

	ft = new Fortest()
	ft.hello().then((res)=>{
		console.log("this is then")
	}).catch((res)=>{
		console.log("this is catch")
	})

	res.send('hello')
});




console.log("server on");

app.listen(3000);
