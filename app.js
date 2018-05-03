const express = require('express');
const bodyParser = require('body-parser');
// const signup = require('./routes/signup');
const user = require('./routes/user');


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





console.log("server on");

app.listen(3000);
