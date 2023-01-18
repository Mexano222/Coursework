const express = require('express');
const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:8080']
    }
});

const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(http);
app.use('/peerjs', peerServer);

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

});

http.listen(1337);