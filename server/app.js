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



//Mettre app.use(checkToken)
//Mettre les routes protegées


server.listen(3000);
