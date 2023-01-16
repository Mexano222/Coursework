<template>
  <div class="app-wrapper">
    <div class="main-view">
      <div id="videos">
        <div class="video-wrapper" v-for="camera in cameras" :key="camera.name"
          :style="{ flex: '0 0 calc(100%/' + Math.ceil(Math.sqrt(Math.max(cameras.length, 2))) + ')'}">
          <div class="user-cam"><label>{{ camera.name }}</label></div>
        </div>
      </div>
      <div class="controls">
        <button class="control-btn" id="toggle_camera" @click="isCameraToggle = !isCameraToggle"
          :class="{ active: isCameraToggle }">Camera</button>
        <button class="control-btn" id="toggle_micro" @click="isMicroToogle = !isMicroToogle"
          :class="{ active: isMicroToogle }">Microphone</button>
        <button class="control-btn" id="toggle_chat" @click="isChachToogle = !isChachToogle"
          :class="{ active: isChachToogle }">Chach</button>
        <button class="control-btn" id="room_invite">Invite</button>
        <button class="control-btn" id="room_leave" @click="leave">Leave</button>
      </div>
    </div>

    <ChachItem class="main-chat" :class="{ chach_visible: isChachToogle }" />
  </div>

</template>

<script>
import router from '@/router';

export default {
  props: ['socket', 'roomId'],
  data() {
    return {
      message: null,

      cameras: [
        { name: "123" },
        { name: "123" },
        { name: "123" },
        { name: "123" },
        { name: "123" },
        { name: "123" },
        { name: "123" },
        { name: "123" },
      ],

      isCameraToggle: false,
      isMicroToogle: false,
      isChachToogle: false
    }
  },
  created() {
    console.log("socket " + this.socket);
    console.log("room " + this.roomId);
  },
  methods: {
    leave() {
      router.push({ name: 'login' })
    },
    sendMessage() {
      console.log(this.message)
      if (!this.message) {
        return
      }
      this.socket.sendMessage(this.message)
    }
  }
}
</script>

<style lang="scss">
.controls {
  margin-top: auto;
}

.control-btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  width: 1.5em;
  height: 1.5em;
  background: red;
  border-radius: 100px;
  cursor: pointer;

  &#room_invite {
    background-color: #0f0;
  }
}

#room_leave {
  background-color: red;
}

.active {
  background-color: #0f0;
}

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

.app-wrapper {
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 95vh;
  flex-wrap: wrap;
  justify-content: space-between;
}

#videos {
  max-height: 95vh;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  >* {


  }
}


.video-wrapper{
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
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

  }

}
</style>

