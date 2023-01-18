import { Peer } from "peerjs";

class PeerjsService {
    peer;
    constructor() { }

    setupPeerConnection(id) {
        this.peer = new Peer(id, {
            path: process.env.VUE_APP_PEERJS_PATH,
            host: '/',
            port: process.env.VUE_APP_PEERJS_PORT,
        });
    }

    answerCall(stream, cb) {
        this.peer.on('call', (call) => {
            call.answer(stream)
            call.on('stream', (userVideoStream) => {
                return cb({ id: call.peer, username: call.metadata.username, stream: userVideoStream })
            })
        })
    }

    makeCall(userId, localUser, cb) {
        const call = this.peer.call(userId, localUser.stream)
        call.metadata = { username: localUser.username }
        call.on('stream', (userVideoStream) => {
            return cb({ id: call.peer, stream: userVideoStream })
        })
    }

    disconnect() {
        if (this.peer) {
            this.peer.disconnect();
        }
    }

    async getMedia(constraints) {
        try {
            return await navigator.mediaDevices.getUserMedia(constraints);
        } catch (e) {
            console.log('[ERROR]' + e)
        }
    }

}

export default new PeerjsService();