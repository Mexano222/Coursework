<template>
  <div class="video-wrapper">
    <div class="cam-wrapper" v-for="video in videos" :key="video"
      :style="{ flex: '0 0 calc(100%/' + Math.ceil(Math.sqrt(videos.length)) + ')' }">
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
      videos: [
        {username: 123},
        {username: 123},
        {username: 123},
        {username: 123},
      ]
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
  height: 95vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.cam-wrapper {
  box-sizing: border-box;
  border: 1px solid red;
  max-width: 100%;
  max-height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-cam {
  box-sizing: border-box;
  width: 1280px;
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  border: 1px solid #0f0;
  aspect-ratio: 16/9;

  >* {
    position: absolute;
    bottom: 0;
    display: flex;
  }
}
</style>