
module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('subscribe', function (room) {
            console.log('joining room', room);
            socket.join(room);
        });

        socket.on('send message', function (data) {
            socket.to(data.id).broadcast.emit('new message', { ...data });
        });

        socket.on('unsubscribe', function (room) {
            console.log('leaving room', room);
            socket.leave(room);
        })

        socket.on("disconnect", () => console.log("Client disconnected"));
        // var clients = io.sockets.clients();
        // var clients = io.sockets.clients();
        // console.log(clients)
    })
}