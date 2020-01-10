
// const notificationModel = require('./models/notificationModel.js');
const database = require('./controllers/database');

module.exports = (io) => {

    io.on('connection', (socket) => {

        socket.on('subscribe', function (room) {
            console.log('joining room', room);
            if (room) { socket.join(room); }
        });

        socket.on('notif_subscribe', function (room) {
            if (room) { 
                console.log('joining room NOTIF_subscribe: ', room);
                socket.join(room);
             }
        });

        socket.on('send message', function (data) {
            console.log('seng message', data);
            if (data.id) {
                socket.join(data.id)
                socket.to(data.id).broadcast.emit('new message', { ...data });
            }
        });


        socket.on('notif', function (data) {
            if (data.type === 5) {
                let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
                database.connection()
                    .then((conn) => {
                        return conn.query('INSERT INTO notifs (to_id, from_id, type, date) VALUES(?, ?, ?, ?)', [data.to_id, data.from_id, data.type, date])
                            .then(() => {
                                conn.end();
                                socket.to(data.to_id + "_notif").broadcast.emit('notif', { ...data });
                            }).catch()
                    })
            }
            else if (data.type === 2)
                socket.to(data.to_id + "_notif").broadcast.emit('notif', { ...data });
            else if (data.to_id)
                socket.to(data.to_id + "_notif").broadcast.emit('notif', { ...data });

        })
    })
}