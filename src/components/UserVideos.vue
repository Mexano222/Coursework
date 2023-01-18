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
// import { nextTick } from 'vue'

export default {
  props: ['username', 'peer'],
  data() {
    return {
      videos: []
    }
  },
  created() {
    this.videos.unshift(this.$parent.localUser)
    this.getVideos()
  },
  methods: {
    getVideos() {
      this.$parent.socket.subscribeToStreamConnect((data) => {
        this.videos.push(data)
        this.$parent.peer.call(data.id, this.videos[0].stream, data => {
        })
      })

      this.$parent.socket.subscribeToStreamDisconnect((data) => {
        let foundIndex = this.videos.findIndex(x => x.id == data.id)
        if (foundIndex)
          this.videos.splice(foundIndex, 1)
      })

      this.$parent.socket.subscribeToRestream((data) => {
        this.$parent.peer.call(data.id, this.videos[0].stream, data => {
        })
      })

      this.$parent.peer.subscribeToCalls(cb => {
        if (this.videos.slice(1).findIndex(x => x.id == cb.id) >= 0)
          return
        this.$parent.socket.getUsernameOf(cb.id, data => {
          this.videos.push(data)
        })
      })

      this.$parent.peer.answerCall(this.videos[0].stream, data => {
        let foundIndex = this.videos.findIndex(x => x.id == data.id)
        if (foundIndex)
          this.videos[foundIndex].stream = data.stream
      })
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