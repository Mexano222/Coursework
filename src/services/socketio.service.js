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

    subscribeToStream(cb) {
        if (!this.socket) {
            return false
        }
        this.socket.on('connect_user', (username, stream) => {
            return cb(username, stream)
        })
    }

    sendMessage(message, roomId) {
        if (this.socket) {
            this.socket.emit('send_message', message, roomId, (cb) => { })
        }
    }

}

export default new SocketioService()