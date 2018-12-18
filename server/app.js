const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const user = require('./routes/user');
const users = require('./routes/users');
const messages = require('./routes/messages');
const emitter = require('./emitter');
const activationMail = require('./services/activationMail');
const jwtToken = require('./middlewares/jwtToken');


io.on('connection', (socket) => {
	// console.log('fichtre');
	// console.log('hello');
	console.log('Un client est connecté !');
	setTimeout(function(){
		socket.emit('message', 'Vous êtes bien connecté !');
	}, 3000);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


/*MIDDLEWARE*/
app.use(jwtToken);

app.use('/api/user', user);
app.use('/api/messages', messages);
app.use('/api/users', users);

// app.get('/', (req, res) => {
// 	console.log('app.get');
// 	res.sendFile(__dirname + '/socketTest.html');
// });

app.get('/', (req, res) => {
	console.log("hello");
	res.send("hello");
});

// app.post('/api/:pouet', (req, res) => {
// 	console.log(req.params);
// 	res.send("Hello fuck 2");
// });



server.listen(3000);
// app.listen(3000);
