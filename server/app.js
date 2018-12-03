const express = require('express');
const bodyParser = require('body-parser');
const user = require('./routes/user');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/user', user);

// function foo(req, res) {
//
// 	console.log(req.params);
//
// 	res.send("Hello world");
// }

// app.get('/:id', (req, res) => {
// 	console.log(req.params);
// 	res.send("hello");
// });



// app.get('/', (req, res) => {
// 	console
// 	res.send("Hello fuck 2");
// });

// app.post('/api/:pouet', (req, res) => {
// 	console.log(req.params);
// 	res.send("Hello fuck 2");
// });



app.listen(3000);
