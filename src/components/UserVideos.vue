<template>
  <div class="video-wrapper">
    <div class="cam-wrapper" v-for="video in videos" :key="video.id"
         :style="{ flex: '0 0 calc(100%/' + Math.ceil(Math.sqrt(videos.length)) + ')' }">
      <div class="user-cam">
        <label>{{ video.username }}</label>
        <video v-if="video.stream" :srcObject.prop="video.stream" autoplay :muted="videos[0] === video" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['socket', 'peer', 'localUser'],
  data() {
    return {
      videos: []
    }
  },
  created() {
    this.videos.unshift(this.localUser)
    this.getVideos()
  },
  methods: {
    getVideos() {
      this.socket.subscribeToStreamConnect((data) => {
        this.videos.push(data)
        this.peer.makeCall(data.id, this.localUser, data => {
          let foundIndex = this.findIndexById(this.videos, data.id)
          if (foundIndex) this.videos[foundIndex].stream = data.stream
        })
      })

      this.socket.subscribeToStreamDisconnect((data) => {
        let foundIndex = this.findIndexById(this.videos, data.id)
        if (foundIndex) this.videos.splice(foundIndex, 1)
      })

      this.peer.answerCall(this.localUser.stream, data => {
        if (this.findIndexById(this.videos.slice(1), data.id) >= 0)
          return;
        this.videos.push(data)
      })
    },
    findIndexById(videos, id) {
      return videos.findIndex(x => x.id == id)
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