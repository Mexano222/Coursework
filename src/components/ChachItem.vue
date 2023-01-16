<template>
  <div class="main-chat">
    <div class="main-chat-wrapper">
      <div class="messages-wrapper">
        <div id="messages">
          <div v-for="message in messages" :key="message">
            <label>
              {{ message.username }}
            </label>
            {{ message.message }}
          </div>
        </div>
      </div>
      <form id="form-message" action="" @submit.prevent>
        <input id="input-message" placeholder="Message" autocomplete="off" v-model="enteredMessage" />
        <button @click="sendMessage">send</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['roomId'],
  data() {
    return {
      enteredMessage: null,
      messages: [],
      isOpen: true
    }
  },
  mounted() {
    this.getMessages();
  },
  methods: {
    sendMessage() {
      if (!this.enteredMessage) {
        return;
      }
      this.$parent.socket.sendMessage(this.enteredMessage, this.roomId);
      this.enteredMessage = null;
    },
    getMessages() {
      this.$parent.socket.subscribeToMessages((data) => {
        this.messages.push(data);
      });
    }
  },
}
</script>

<style lang="scss">
.main-chat-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-left: 2px solid;

  div {
    width: 100%;
  }
}

.messages-wrapper {
  margin-top: auto;
  min-height: 40px;
}
</style>