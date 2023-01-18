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
    });

    socket.on('connect_to_peer', (roomId) => {
        console.log("User [" + socket.id + "] " + socket.username + " connected to peer in room " + roomId)
        socket.to(roomId).emit('connect_user_stream', { id: socket.id, username: socket.username });
    })

    socket.on('leave_room', (roomId) => {
        console.log("User [" + socket.id + "] " + socket.username + " leave from room " + roomId)
        socket.to(roomId).emit('disconnect_user_stream', { id: socket.id });
        socket.leave(roomId);
    });

    socket.on('send_message', (message, roomId) => {
        io.to(roomId).emit('load_message', { username: socket.username, message: message });
    });

    socket.on('get_username_ask', (userId) => {
        console.log(socket.id + " asks for " + userId + " username")
        io.to(socket.id).emit('get_username_resp', { id: userId, username: io.sockets.sockets.get(userId).username });
    });

});

http.listen(1337);