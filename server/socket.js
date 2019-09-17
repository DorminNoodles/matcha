
const notificationModel = require('./models/notificationModel.js');

module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('subscribe', function (room) {
            console.log('joining room', room);
            if (room)
                socket.join(room);
        });

        socket.on('notif_subscribe', function (room) {
            console.log('joining room notif_subscribe', room);
            if (room)
                socket.join(room);
        });

        socket.on('send message', function (data) {
            if (data.id)
                socket.to(data.id).broadcast.emit('new message', { ...data });
        });

        socket.on('unsubscribe', function (room) {
            console.log('leaving room', room);
            socket.leave(room);
        })

        socket.on('notif', function (data) {

            console.log(data)
            if (data.to_id)
                sendNotif(data, socket)

            if (data.type === 2)
                sendNotif(data, socket)

        })

        socket.on("disconnect", () => console.log("Client disconnected"));
    })
}

sendNotif = ({ data, socket }) => {
    notificationModel.new(data)
        .then(() => {
            socket.to(data.to_id + "_notif").broadcast.emit('notif', { ...data });
        }).catch(() => { })
}