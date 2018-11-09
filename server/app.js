const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const user = require('./user/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var hello = () => {
	return new Promise((resolve, reject) => {
		console.log("Hello");
		resolve(42);
	})
}

var bonjour = () => {
	return new Promise((resolve, reject) => {
		console.log("Hello");
		reject();
	})
}

app.use('/api/user', user);

app.get('/', (req, res) => {
	hello()
	.then(() => {
		console.log("OK");
	}).then((resultat) => {
		console.log('OK2');
		reject();
	}).then((resultat) => {
		console.log('Prout');
	}).catch(() => {
		console.log("ERR");
	})
	res.send("Hello fuck 2");
});

app.get('/api/createUser', (req, res) => {
	res.send("Hello fuck 2");
});

app.post('/api/:pouet', (req, res) => {
	console.log(req.params);
	res.send("Hello fuck 2");
});

app.listen(3000);
