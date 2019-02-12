const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


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


// the following two will emit to all the sockets connected to `/`

app.use(express.static('public'));

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

app.get('/', (req, res) => {
	console.log(req.token)
	if (1) {
		io.on('connection', (socket) => {
			socket.join('salon1');
			console.log(socket.id);
			console.log('Un client est connecté !');
			// setTimeout(function(){
			// 	socket.emit('message', 'Vous êtes bien connecté !');
			// }, 2500);
		});
		setTimeout(function(){
			io.to("salon1").emit('message', 'Vous êtes bien connecté au slaon 1 !');
		}, 2000);

		res.sendFile(__dirname + '/socketTest.html');
	}
	else
		res.send("error");
});

server.listen(3000);
