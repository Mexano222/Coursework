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

    subscribeToCalls(cb) {
        this.peer.on('call', (call) => {
            return cb({ id: call.peer })
        })
    }

    answerCall(stream, cb) {
        this.peer.on('call', (call) => {
            console.log("answer")
            console.log(call)
            console.log(stream)
            call.answer(stream)
            call.on('stream', (userVideoStream) => {
                console.log(userVideoStream)
                return cb({ id: call.peer, stream: userVideoStream })
            })
        })
    }

    call(userId, stream, cb) {
        const call = this.peer.call(userId, stream)
        console.log("call")
        console.log(call)
        console.log(stream)
        call.on('stream', (userVideoStream) => {
            console.log(userVideoStream)
            return cb({ id: call.peer, stream: userVideoStream })
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
            return stream
        } catch (e) {
            console.log('[ERROR]' + e)
        }
    }

}

export default new PeerjsService();