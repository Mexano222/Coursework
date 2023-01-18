<template>
  <div class="video-wrapper">
    <div class="cam-wrapper" v-for="video in videos" :key="video.id"
         :style="{ flex: '0 0 calc(100%/' + Math.ceil(Math.sqrt(videos.length)) + ')' }">
      <div class="user-cam">
        <label>{{ video.username }}</label>
        <video v-if="video.stream" :srcObject.prop="video.stream" autoplay :muted="videos[0] === video" ref="videos" />
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
    this.videos.unshift(this.$parent.localUser)
    this.getVideos()
  },
  methods: {
    getVideos() {
      this.$parent.socket.subscribeToStreamConnect((data) => {
        this.videos.push(data)
        this.peer.call(data.id, this.$parent.localUser.stream, data => {
          let foundIndex = this.findIndexById(this.videos, data.id)
          if (foundIndex) this.videos[foundIndex].stream = data.stream
        })
      })

      this.$parent.socket.subscribeToStreamDisconnect((data) => {
        let foundIndex = this.findIndexById(this.videos, data.id)
        if (foundIndex) this.videos.splice(foundIndex, 1)
      })

      this.peer.subscribeToCalls(cb => {
        if (this.findIndexById(this.videos.slice(1), cb.id) >= 0)
          return;
        this.$parent.socket.getUsernameOf(cb.id, data => {
          if (this.findIndexById(this.videos.slice(1), data.id) >= 0)
            return;
          this.videos.push(data)
          this.$forceUpdate();
        })
      })

      this.peer.answerCall(this.$parent.localUser.stream, data => {
        let foundIndex = this.findIndexById(this.videos, data.id)
        if (foundIndex) this.videos[foundIndex].stream = data.stream
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