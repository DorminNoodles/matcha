
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const user = require('./routes/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/user', user);

app.get('/', (req, res) => {
	res.send("Hello fuck 2");
});

app.post('/api/:pouet', (req, res) => {
	console.log(req.params);
	res.send("Hello fuck 2");
});



app.listen(3000);
