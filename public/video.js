const videos = document.getElementById('videos');
const myVideo = document.createElement('video');
myVideo.muted = true;
let myVideoStream;

let peer = new Peer({
    path: '/peerjs',
    host: '/',
    port: '1337',
});


const addVideoStreamToPage = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
        videos.append(video);
    });
};

const connectUser = (userId, stream) => {
    const call = peer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', (userVideoStream) => {
        addVideoStreamToPage(video, userVideoStream);
    });
};

navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
}).then((stream) => {
    myVideoStream = stream;
    addVideoStreamToPage(myVideo, stream);

    peer.on('call', (call) => {
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream', (userVideoStream) => {
            addVideoStreamToPage(video, userVideoStream);
        });
    });

    socket.on('connect-user-stream', (userId) => {
        connectUser(userId, stream);
    });
});


peer.on('open', (id) => {
    console.log(id);
    socket.emit('join_room', ROOM_ID, id);
});