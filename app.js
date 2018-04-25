const express = require('express');
const bodyParser = require('body-parser');
// const signup = require('./routes/signup');
const user = require('./routes/user');


const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use('/api/user', user);

app.get('/', function (req, res){
	res.send('api available');
});



console.log("server on");

app.listen(3000);
