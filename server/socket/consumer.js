module.exports = function(io) {
    io.on('connection', function(socket) {
        socket.emit("FromAPI", "message");

        socket.on('message', function(message) {
            logger.log('info',message.value);
            socket.emit('ditConsumer',message.value);
            console.log('from console',message.value);
        });
    });
};