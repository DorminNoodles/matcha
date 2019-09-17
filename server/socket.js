
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
            socket.to(data.id).broadcast.emit('new message', { ...data });
        });

        socket.on('unsubscribe', function (room) {
            console.log('leaving room', room);
            socket.leave(room);
        })

        socket.on('notif', function (data) {
            console.log(data)
            console.log('HEYYYY')
            // socket.to(data.id).broadcast.emit('new message', { ...data });
            socket.broadcast.emit('notif', { ...data });
        })

        socket.on("disconnect", () => console.log("Client disconnected"));
        // var clients = io.sockets.clients();
        // var clients = io.sockets.clients();
        // console.log(clients)
    })
}