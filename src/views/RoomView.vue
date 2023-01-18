<template>
  <div class="app-wrapper">
    <div class="main-view">
      <UserVideos v-if="isStreamLoaded" :socket="socket" :peer="peer" :localUser="localUser" />
      <div v-else> Allow access to camera and microphone </div>
      <div class="controls">
        <button class="control-btn" id="toggle_camera" @click="toggleCamera" :class="{ active: isCameraToggle }">
          <img src="../assets/camera.svg" alt="camera" height="64" width="64" viewBox="0 0 64 64">
        </button>
        <button class="control-btn" id="toggle_micro" @click="toggleMicro" :class="{ active: isMicroToogle }">
          <img src="../assets/microphone.svg" alt="microphone" height="64" width="64" viewBox="0 0 64 64">
        </button>
        <button class="control-btn" id="toggle_chat" @click="isChachToogle = !isChachToogle"
                :class="{ active: isChachToogle }">
          <img src="../assets/chat.svg" alt="chat" height="64" width="64" viewBox="0 0 64 64">
        </button>
        <button class="control-btn" id="room_invite">
          <img src="../assets/invite.svg" alt="invite" height="64" width="64" viewBox="0 0 64 64">
        </button>
        <button class="control-btn" id="room_leave" @click="leave">
          <img src="../assets/leave.svg" alt="leave" height="64" width="64" viewBox="0 0 64 64">
        </button>
      </div>
    </div>

    <ChachItem v-show="isChachToogle" :socket="socket" :roomId="roomId" />
  </div>

</template>
<script>
import peer from '../services/peerjs.service'
import router from '@/router'

export default {
  props: ['socket', 'roomId', 'username'],
  data() {
    return {
      peer: null,
      isStreamLoaded: false,
      isCameraToggle: false,
      isMicroToogle: false,
      isChachToogle: true,
      localUser: {
        id: this.socket.getId(),
        username: this.username,
        stream: null
      }
    }
  },
  created() {
    peer.setupPeerConnection(this.socket.getId())
    this.peer = peer
    this.peer.getMedia({
      audio: true,
      video: true
    }).then((stream) => {
      this.localUser.stream = stream
      this.localUser.stream.getVideoTracks()[0].enabled = this.isCameraToggle
      this.localUser.stream.getAudioTracks()[0].enabled = this.isMicroToogle
      this.isStreamLoaded = true
      this.socket.connectToPeer(this.roomId)
    })
  },
  methods: {
    toggleCamera() {
      this.isCameraToggle = !this.isCameraToggle
      this.localUser.stream.getVideoTracks()[0].enabled = this.isCameraToggle
    },
    toggleMicro() {
      this.isMicroToogle = !this.isMicroToogle
      this.localUser.stream.getAudioTracks()[0].enabled = this.isMicroToogle
    },
    leave() {
      this.socket.leaveRoom(this.roomId)
      this.localUser.stream.getTracks().forEach(track => {
        this.localUser.stream.removeTrack(track)
        track.stop()
      })
      this.peer.disconnect()
      router.push({ name: 'login' })
    }
  }
}
</script>
<style lang='scss'>
// Main colors
$color-text: #e2e2e2;
$color-background: #121212;
$color-dark: #261421;
$color-primary: #751A2C;
$color-secondary: #AD6A6C;
$color-accent: #F2B0A5;
$filter-accent: invert(78%) sepia(10%) saturate(1124%) hue-rotate(320deg) brightness(93%) contrast(104%);

.app-wrapper {
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 95vh;
  flex-wrap: wrap;
  justify-content: space-between;

  .main-view {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    flex: 3;
  }

  .main-chat {
    height: 95vh;
    flex: 1;
    min-width: 5%;
    word-wrap: break-word;
    background-color: $color-dark;

    &.chach_visible {
      display: none;
    }
  }
}

.controls {
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.controls:focus {
    outline: none;
  }

.control-btn {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  aspect-ratio: 1;
  background: $color-dark;
  border-radius: 100px;
  border: 2px solid $color-accent;
  color: $color-accent;
  cursor: pointer;

  &#room_invite,
  &#room_leave {
    background-color: $color-primary;
  }

  >img {
    filter: $filter-accent
  }
}

.active {
  background-color: $color-primary;
}

.hidden {
  display: none;
}
</style>

