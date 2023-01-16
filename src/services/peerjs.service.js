import { Peer } from "peerjs";

class PeerjsService {
    peer;
    constructor() { }

    setupPeerConnection(socket, roomId) {
        this.peer = new Peer({
            path: process.env.VUE_APP_PEERJS_PATH,
            host: '/',
            port: process.env.VUE_APP_PEERJS_PORT,
        });

        this.peer.on('open', (id) => {
            console.log(id);
            socket.emit('join_room', roomId, socket.id);
        })
    }

    disconnect() {
        if (this.peer) {
            this.peer.disconnect();
        }
    }

    async getMedia(constraints) {
        let stream = null;
        try {
            stream = await navigator.mediaDevices.getUserMedia(constraints);
            console.log(stream.getTracks())
            return stream
        } catch (e) {
            console.log('[ERROR]' + e)
        }
    }

    call(userId, stream) {
        if (this.peer) {
            this.peer.call(userId, stream);
        }
    }

}

export default new PeerjsService();