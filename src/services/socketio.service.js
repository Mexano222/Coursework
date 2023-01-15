import { io } from 'socket.io-client';

class SocketioService {
    socket;
    constructor() { }

    getId() {
        return this.socket.id;
    }

    setupSocketConnection() {
        this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
    }

    joinRoom(username, roomId) {
        this.socket.emit('join_room', username, roomId);
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    sendMessage(username, message) {
        this.socket.emit('send_message', username, message);
        this.socket.on('load_message', (data) => {
            console.log(data);
        });
    }

}

export default new SocketioService();