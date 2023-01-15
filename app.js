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
const peerServer = ExpressPeerServer(http, {
    debug: true
});

// Client imports
app.use('/peerjs', peerServer);
app.use('/node_modules', express.static(__dirname + '/node_modules/'))
app.use(express.static('public'));
app.use(siofu.router);

app.get('/', (req, res) => {
    res.redirect(`/room/${uuidv4()}`);
});

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room });
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('join_room', (username, roomId) => {
        socket.join(roomId);
        // socket.to(roomId).emit('connect-user', userId);
        console.log("User [" + socket.id + "] " + username + " connected to room " + roomId)

        socket.on('send_message', (message) => {
            io.to(roomId).emit('load_message', username, message);
        });
    });
});

http.listen(1337);