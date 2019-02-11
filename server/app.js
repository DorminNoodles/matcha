const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// const multer = require('multer');

const user = require('./routes/user');
const users = require('./routes/users');
const messages = require('./routes/messages');
const likes = require('./routes/likes');
const like = require('./routes/like');
const block = require('./routes/block');
const photos = require('./routes/photos');
const emitter = require('./emitter');
const activationMail = require('./services/activationMail');
const jwtToken = require('./middlewares/jwtToken');
const geoloc = require('./services/geoloc');


io.on('connection', (socket) => {
	console.log('Un client est connecté !');
	setTimeout(function(){
		socket.emit('message', 'Vous êtes bien connecté !');
	}, 3000);
});
app.use(express.static('public'));
app.use(express.static('pictures'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*MIDDLEWARE*/
app.use(jwtToken);

/*ROUTES*/
app.use('/api/user', user);
app.use('/api/messages', messages);
app.use('/api/users', users);
app.use('/api/likes', likes);
app.use('/api/block', block);
app.use('/api/photos', photos);

//Mettre app.use(checkToken)
//Mettre les routes protegées

server.listen(3000);
