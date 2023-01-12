const express = require('express');
const app = express();
const siofu = require('socketio-file-upload')
var fs = require('fs')

const server = require('http').createServer(app);
const { v4: uuidv4 } = require('uuid');

const io = require('socket.io')(server);
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug: true
});

// Client imports
app.use('/peerjs', peerServer);
app.use('/node_modules', express.static(__dirname + '/node_modules/'))
app.use(express.static('public'));
app.use(siofu.router);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`);
});

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room });
});

io.on('connect', (socket) => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).emit('connect-user', userId);
        console.log("User " + userId + " connected to room " + roomId)
        // socket.on('message', (message) => {
        //     io.to(roomId).emit('createMessage', message, userName);
        // });
    });
});

server.listen(1337);