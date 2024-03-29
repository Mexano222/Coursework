import { io } from 'socket.io-client'

class SocketioService {
    socket
    constructor() { }

    setupSocketConnection() {
        this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT)
    }

    joinRoom(username, roomId) {
        this.socket.emit('join_room', username, roomId)
    }

    connectToPeer(roomId) {
        this.socket.emit('connect_to_peer', roomId)
    }

    leaveRoom(roomId) {
        this.socket.emit('leave_room', roomId)
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect()
        }
    }

    subscribeToMessages(cb) {
        if (!this.socket) {
            return false
        }
        this.socket.on('load_message', (username, message) => {
            return cb(username, message)
        })
    }

    unsubscribeFromMessages() {
        this.socket.removeListener('load_message');
    }

    subscribeToStreamConnect(cb) {
        if (!this.socket) {
            return false
        }
        this.socket.on('connect_user_stream', (userId, username) => {
            return cb(userId, username)
        })
    }

    subscribeToStreamDisconnect(cb) {
        if (!this.socket) {
            return false
        }
        this.socket.on('disconnect_user_stream', (userId) => {
            return cb(userId)
        })
    }

    sendMessage(message, roomId) {
        if (this.socket) {
            this.socket.emit('send_message', message, roomId)
        }
    }

    getId() {
        return this.socket.id
    }

}

export default new SocketioService()