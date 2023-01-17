const express = require('express');
const app = express();
const http = require('http').createServer(app);

const { v4: uuidv4 } = require('uuid');

const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:8080']
    }
});
const siofu = require('socketio-file-upload')
var fs = require('fs')

const { ExpressPeerServer } = require('peer');
const { callbackify } = require('util');
const peerServer = ExpressPeerServer(http, {
    debug: true
});

// Client imports
app.use('/peerjs', peerServer);
app.use('/node_modules', express.static(__dirname + '/node_modules/'))
app.use(express.static('public'));
app.use(siofu.router);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('join_room', (username, roomId) => {
        socket.join(roomId);
        socket.username = username;
        console.log("User [" + socket.id + "] " + socket.username + " connected to room " + roomId)

        // socket.to(roomId).emit('connect-user-stream', userId);
    });

    socket.on('leave_room', (roomId) => {
        console.log("User [" + socket.id + "] " + socket.username + " leave from room " + roomId)
        socket.leave(roomId);
    });

    socket.on('send_message', (message, roomId) => {
        io.to(roomId).emit('load_message', { username: socket.username, message: message });
    });
});

http.listen(1337);