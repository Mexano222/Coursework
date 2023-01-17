<template>
  <div class="video-wrapper">
    <div class="cam-wrapper" v-for="video in videos" :key="video.id"
      :style="{ flex: '0 0 calc(100%/' + Math.ceil(Math.sqrt(videos.length)) + ')' }">
      <div class="user-cam" @click="getVideos">
        <label>{{ video.username }}</label>
        <video v-if="video.stream" :srcObject.prop="video.stream" autoplay :muted="videos[0] === video" />
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
        { username: 123 },
        { username: 123 },
      ]
    }
  },
  mounted() {
    this.peer.setupPeerConnection(this.socket)
    this.videos.unshift(this.$parent.localUser);
    console.log(this.videos)
  },
  methods: {
    getVideos() {
      console.log(this.videos)
      console.log(this.videos[0].stream.getTracks())
    }
  }
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

  >label {
    z-index: 10;
  }

  >* {
    position: absolute;
    bottom: 0;
    display: flex;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>