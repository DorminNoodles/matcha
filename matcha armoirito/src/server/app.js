const express = require('express');
const bodyParser = require('body-parser');
const user = require('./routes/user');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
}); 

app.use('/api/user', user);

// function foo(req, res) {
//
// 	console.log(req.params);
//
// 	res.send("Hello world");
// }

app.get('/:id', (req, res) => {
	console.log(req.params);
	res.send("hello");
});



// app.get('/', (req, res) => {
// 	console
// 	res.send("Hello fuck 2");
// });

// app.post('/api/:pouet', (req, res) => {
// 	console.log(req.params);
// 	res.send("Hello fuck 2");
// });



app.listen(3000);
