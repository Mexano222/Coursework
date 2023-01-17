<template>
  <div class="main-chat">
    <div class="main-chat-wrapper">
      <div class="messages-wrapper">
        <div id="messages" ref="messagesDiv">
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
          <div class="btn-send">
            <img src="../assets/send.svg" alt="invite picture" height="54" width="54" viewBox="0 0 54 54">
          </div>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { nextTick } from 'vue'

export default {
  props: ['roomId'],
  data() {
    return {
      enteredMessage: null,
      messages: [
        { id: 0, message: 'Welcome to room ' + this.roomId },
      ],
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
  methods: {
    sendMessage() {
      if (!this.$refs.userInput.innerText) {
        return
      }
      this.$parent.socket.sendMessage(this.$refs.userInput.innerText, this.roomId)
      this.$refs.userInput.innerHTML = ''
    },
    getMessages() {
      this.$parent.socket.subscribeToMessages(async (data) => {
        data.id = this.messages.length
        this.messages.push(data)
        await nextTick()
        this.$refs.messages.slice(-1)[0].scrollIntoView()
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
::-webkit-scrollbar{
  width: 5px;
}
::-webkit-scrollbar-track {
  background: $color-primary; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: $color-accent; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: $color-secondary; 
}
#form-message {
  display: flex;
  //overflow: auto;
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
  padding: 0 15px ;
  margin: 15px 0;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
  line-height: normal;
}

#input-message:focus {
    outline: none;
  }

.send_btn {
  background-color: transparent;
  color: $color-accent;
  border: none;
  cursor: pointer;
}

.main-chat-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-left: 2px solid;

  .messages-wrapper {
    overflow: auto;
    height: 100%;
    min-height: 40px;
    margin: 10px;
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