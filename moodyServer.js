var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', socket => {
    // Proxing action to device
    socket.on('init', () => {
        console.log('init')

        // TO: DRIVER
        console.log('getLights emitted')
        io.emit('getLights');
    });

    // Proxing response from device
    socket.on('initSuccess', response => {
        console.log('initSuccess')

        io.emit('initSuccess', response);
    });

    socket.on('set', response => {
        io.emit('set', response);
    });
});

/**
 *  3100 is main server
 */
http.listen(3100, () => {
    console.log('MoodyServer: Hello!');
    console.log('MoodyServer: I\'m listening on 3100!');
});
