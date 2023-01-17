import { Peer } from "peerjs";

class PeerjsService {
    peer;
    constructor() { }

    setupPeerConnection() {
        this.peer = new Peer({
            path: process.env.VUE_APP_PEERJS_PATH,
            host: '/',
            port: process.env.VUE_APP_PEERJS_PORT,
        });
    }

    answerCall(stream) {
        this.peer.on('call', (call) => {
            call.answer(stream)
            call.on('stream', (userVideoStream) => {
                return userVideoStream
            })
        })
    }

    call(userId, stream) {
        this.peer.call(userId, stream)
        this.call.on('stream', (userVideoStream) => {
            return userVideoStream
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

}

export default new PeerjsService();