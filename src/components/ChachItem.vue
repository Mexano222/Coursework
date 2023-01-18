<template>
  <div class="main-chat">
    <div class="main-chat-wrapper">
      <div class="messages-wrapper">
        <div id="messages">
          <div class="message" v-for="message in messages" :key="message" ref="messages">
            <label class="username" v-if="message.username">
              {{ message.username + ': ' }}
            </label>
            {{ message.message }}
          </div>
        </div>
      </div>
      <form id="form-message" action="" @submit.prevent>
        <div id="input-message" placeholder="Message" contenteditable="true" ref="userInput"></div>
        <button class="send_btn" @click="sendMessage">
          <img src="../assets/send.svg" alt="invite picture" height="54" width="54" viewBox="0 0 54 54">
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { nextTick } from 'vue'

export default {
  props: ['socket', 'roomId'],
  data() {
    return {
      messages: [{ id: 0, message: 'Welcome to room ' + this.roomId }],
      isOpen: true
    }
  },
  mounted() {
    this.getMessages()
    this.$refs.userInput.addEventListener('keydown', (e) => {
      if (e.which === 13 && e.shiftKey === false) {
        e.preventDefault()
        this.sendMessage()
      }
    })
  },
  beforeUnmount() {
    this.socket.unsubscribeFromMessages()
  },
  methods: {
    sendMessage() {
      if (!this.$refs.userInput.innerText) {
        return
      }
      this.socket.sendMessage(this.$refs.userInput.innerText, this.roomId)
      this.$refs.userInput.innerHTML = ''
    },
    getMessages() {
      this.socket.subscribeToMessages(async (data) => {
        let length = this.messages.push(data)
        await nextTick()
        this.$refs.messages[--length].scrollIntoView()
      })
    },
  },
}
</script>

<style lang="scss">
// Main colors
$color-text: #e2e2e2;
$color-background: #121212;
$color-dark: #261421;
$color-primary: #751A2C;
$color-secondary: #AD6A6C;
$color-accent: #F2B0A5;
$filter-accent: invert(78%) sepia(10%) saturate(1124%) hue-rotate(320deg) brightness(93%) contrast(104%);

#form-message {
  display: flex;
  max-height: 50%;
  box-sizing: border-box;
  background-color: $color-primary;
  color: $color-accent;
  border-radius: 25px;
  border: 4px solid $color-accent;
  font-weight: bold;
  margin: 10px;
  align-items: center;
}

#input-message {
  overflow-y: auto;
  max-height: 100%;
  padding: 0 15px;
  margin: 15px 0;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
  line-height: normal;

  scrollbar-color: $color-accent $color-primary;
  scrollbar-width: thin;

  &::-webkit-scrollbar-track {
    background: $color-primary;
  }
}

#input-message:focus {
  outline: none;
}

.send_btn {
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: transparent;
  color: $color-accent;
  border: none;

  >img {
    filter: $filter-accent
  }
}

.main-chat-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-left: 2px solid;

  .messages-wrapper {
    scrollbar-color: $color-accent $color-dark;
    scrollbar-width: thin;
    overflow: auto;
    height: 100%;
    min-height: 40px;
    padding: 10px;
    box-sizing: border-box;
  }
}

.message {
  text-align: left;
  font-weight: normal;
}

.username {
  font-weight: bold;
}

.btn-send {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>