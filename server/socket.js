
module.exports = (io) => {
    io.on('connection', (socket) => {
        // socket.join('some room');
        // io.to('some room').emit('chat', "Vagues");
        // socket.broadcast.to('some room').emit('chat', "cocuo" );
        // socket.emit("chats", "Va")
        // console.log('made socket con: ', socket.id)

        socket.on('subscribe', function(room) {
            console.log('joining room', room);
            socket.join(room);
        });
        
        socket.on('send message', function(data) {
            console.log(data)
            socket.broadcast.to(data.room).emit('conversation private post', {
                message: data.message
            });
        });

        socket.on('unsubscribe', function(room) {  
            console.log('leaving room', room);
            socket.leave(room); 
        })
        
        // var clients = io.sockets.clients();
        // var clients = io.sockets.clients();
// console.log(clients)
    })
}