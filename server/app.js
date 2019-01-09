const express = require('express');
const bodyParser = require('body-parser');
const user = require('./routes/user');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/user', user);

app.get('/:id', (req, res) => {
	console.log(req.params);
	res.send("hello");
});

app.listen(3000);
