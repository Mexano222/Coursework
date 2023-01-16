<template>
  <div class="main-chat">
    <div class="main-chat-wrapper">
      <div class="messages-wrapper">
        <div id="messages" ref="messagesDiv">
          <div class="message" v-for="message in messages" :key="message">
            <label class="username" v-if="message.username">
              {{ message.username + ': ' }}
            </label>
            {{ message.message }}
          </div>
        </div>
      </div>
      <form id="form-message" action="" @submit.prevent>
        <div id="input-message" placeholder="Message" autocomplete="off" contenteditable="true" ref="userInput"></div>
        <!-- <textarea id="input-message" cols="30" rows="10" placeholder="Message" autocomplete="off" v-model="enteredMessage"></textarea> -->
        <button class="send_btn" @click="sendMessage">send</button>
      </form>
    </div>
  </div>
</template>

<script>
import { thisExpression } from '@babel/types';

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
    this.getMessages();
  },
  updated() {
    this.$refs.messagesDiv.lastElementChild.scrollIntoView();
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
        data.id = this.messages.length;
        this.messages.push(data);
      });

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

#form-message {
  display: flex;
  overflow: auto;
  max-height: 50%;
  box-sizing: border-box;
  background-color: $color-primary;
  color: $color-accent;
  border-radius: 25px;
  border: 4px solid $color-accent;
  font-weight: bold;
  margin: 10px;
}

#input-message {
  overflow: auto;
  max-height: 100%;
  padding: 20px;
  text-align: left;
  width: 100%;
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
</style>