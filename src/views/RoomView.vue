<template>
  <div class="app-wrapper">
    <div class="main-view">
      <UserVideos :username="username" :peer="peer" />

      <div class="controls">
        <button class="control-btn" id="toggle_camera" @click="toggleCamera"
                :class="{ active: isCameraToggle }">Camera</button>
        <button class="control-btn" id="toggle_micro" @click="isMicroToogle = !isMicroToogle"
                :class="{ active: isMicroToogle }">Microphone</button>
        <button class="control-btn" id="toggle_chat" @click="isChachToogle = !isChachToogle"
                :class="{ active: isChachToogle }">Chach</button>
        <button class="control-btn" id="room_invite">Invite</button>
        <button class="control-btn" id="room_leave" @click="leave">Leave</button>
      </div>
    </div>

    <ChachItem v-if="isChachToogle" :roomId="roomId" />
  </div>

</template>

<script>
import peer from '../services/peerjs.service';
import UserVideos from '@/components/UserVideos.vue';
import router from '@/router';

export default {
  props: ['socket', 'roomId', 'username'],
  data() {
    return {
      peer: peer,
      isCameraToggle: false,
      isMicroToogle: false,
      isChachToogle: true
    };
  },
  methods: {
    toggleCamera() {
      this.isCameraToggle = !this.isCameraToggle
      if (this.isCameraToggle) {
        peer.getMedia({
          video: this.isCameraToggle,
        }).then((stream) => {
          this.myVideoStream = stream;

          peer.on('call', (call) => {
            call.answer(stream);
            call.on('stream', (userVideoStream) => {
              // addVideoStream(video, userVideoStream);
            });
          });
        });
      }
    },
    leave() {
      router.push({ name: 'login' });
    }
  },
  components: { UserVideos }
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
    flex: 1;

    &.chach_visible {
      display: none;
    }
  }
}

.controls {
  margin-top: auto;
}

.control-btn {
  display: inline-flex;
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
}

.active {
  background-color: $color-primary;
}
</style>

