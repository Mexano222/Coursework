import { io } from 'socket.io-client'

class SocketioService {
    socket
    constructor() { }

    getId() {
        return this.socket.id
    }

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

    reconnectPeer(roomId) {
        this.socket.emit('rejoin_room', roomId)
    }

    sendToServer(msg) {
        this.socket.emit('msg', msg)
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
            this.socket.emit('send_message', message, roomId, (cb) => { })
        }
    }

    getUsernameOf(userId, cb) {
        this.socket.emit('get_username_ask', userId)
        this.socket.on('get_username_resp', (id, username) => {
            return cb(id, username)
        })
    }

}

export default new SocketioService()