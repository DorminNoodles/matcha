
const notificationModel = require('./models/notificationModel.js');
const database = require('./controllers/database');

module.exports = (io) => {
    io.on('connection', (socket) => {

        socket.on('subscribe', function (room) {

            console.log('joining room', room);
            if (room) {
                socket.leave(room);
                socket.join(room);
            }
        });

        socket.on('notif_subscribe', function (room) {
            console.log('joining room notif_subscribe: ', room);
            if (room) {
                socket.leave(room);
                socket.join(room);
            }
        });

        socket.on('send message', function (data) {
            console.log('seng message', data);
            if (data.id)
                socket.to(data.id).broadcast.emit('new message', { ...data });
        });

        socket.on('unsubscribe', function (room) {
            console.log('leaving room', room);
            socket.leave(room);
        })

        socket.on('notif', function (data) {

            if (data.type === 5) {
                let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
                database.connection()
                    .then((conn) => {
                        return conn.query('INSERT INTO notifs (to_id, from_id, type, date) VALUES(?, ?, ?, ?)', [data.to_id, data.from_id, data.type, date])
                            .then((res) => {
                                conn.end();
                                socket.to(data.to_id + "_notif").broadcast.emit('notif', { ...data });
                            }).catch()
                    })
            }
            else if (data.type === 2) {
                console.log(data)
                socket.to(data.to_id + "_notif").broadcast.emit('notif', { ...data });
                socket.to(data.from_id + "_notif").broadcast.emit('notif', { username: data.second, type: data.type, date: data.date, id: data.id });
            }
            else if (data.to_id)
                socket.to(data.to_id + "_notif").broadcast.emit('notif', { ...data });

        })

        socket.on("disconnect", () => console.log("Client disconnected"));
    })
}