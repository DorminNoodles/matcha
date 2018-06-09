const express = require('express');
const bodyParser = require('body-parser');
// const signup = require('./routes/signup');
const user = require('./routes/user');
const login = require('./routes/login');
const Fortest = require('./models/Fortest')


const app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
	res.header("Access-Control-Allow-Methods", 'POST, PUT, GET, DELETE');
  next();
});


app.use('/api/user', user);
app.use('/api/login', login);

app.get('/', function (req, res){
	res.send('api available');
});

app.get('/api/:id', function (req, res){
	req.params.id
	res.send('api available');
});

app.post('/api', function (req, res){
	console.log(req.body)
	res.send("hello")
});

console.log("server on");

app.listen(3000);
