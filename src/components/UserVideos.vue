<template>
  <div class="video-wrapper">
    <div class="cam-wrapper" v-for="video in videos" :key="video"
         :style="{ flex: '0 0 calc(100%/' + Math.ceil(Math.sqrt(Math.max(videos.length, 2))) + ')' }">
      <div class="user-cam">
        <label>{{ video.username }}</label>
        <video v-if="video.stream"></video>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['username', 'peer'],
  data() {
    return {
      videos: []
    }
  },
  mounted() {
    this.peer.setupPeerConnection(this.socket)
    console.log(this.username)
    this.videos.push({
      username: this.username,
      stream: new MediaStream()
    });


    // this.peer.getMedia({
    //   audio: false,
    //   video: false,
    // }).then((stream) => {
    //   this.videos.push({
    //     username: this.username,
    //     stream: stream
    //   });
    //   // this.myVideoStream = stream;

    //   // this.peer.on('call', (call) => {
    //   //   call.answer(stream);
    //   //   call.on('stream', (userVideoStream) => {
    //   //     // addVideoStream(video, userVideoStream);
    //   //   });
    //   // });
    // });
  },
}
</script>

<style lang="scss">
.video-wrapper {
  max-height: 95vh;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.cam-wrapper {
  flex-direction: column;
}

.user-cam {
  box-sizing: border-box;
  width: 100%;
  height: 0;
  position: relative;
  border: 1px solid #0f0;
  padding-top: 56.25%;

  >* {
    position: absolute;
    bottom: 0;
    display: flex;
  }
}
</style>