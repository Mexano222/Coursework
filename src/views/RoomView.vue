<template>
  <div class="main-view">
    <div class="video-wrapper">
      <div id="videos"></div>
    </div>
    <div class="controls">
      <button class="control-btn" id="toggle_camera">Camera</button>
      <button class="control-btn" id="toggle_micro">Microphone</button>
      <button class="control-btn" id="toggle_chat">Chach</button>
      <button class="control-btn" id="room_invite">invite</button>
      <button class="control-btn" id="room_leave">Leave</button>
    </div>
  </div>

  <div class="main-chat">
    <div class="messages-wrapper">
      <div id="messages">

      </div>
    </div>
    <div id="form-message" action="">
      <input id="input-message" placeholder="Message" autocomplete="off" v-model="message" />
      <button v-on:click="sendMessage">send</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['socket', 'roomId'],
  data() {
    return {
      message: null,
    }
  },
  created() {
    console.log("socket " + this.socket);
    console.log("room " + this.roomId);
  },
  methods: {
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
.control-btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  width: 1.5em;
  height: 1.5em;
  background: #0f0;
  border-radius: 100px;
}

#room_leave {
  background-color: red;
}
</style>

