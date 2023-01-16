<template>
  <div class="login">
    <form action="" id="login_form">

      <label for="username">Username</label>
      <input type="text" placeholder="Enter username" v-model="username" id="usename">
      <label for="room_id">Room ID</label>
      <input type="text" placeholder="Enter room id" v-model="roomId" id="room_id">

      <button @click="joinRoom" id="join_btn">Join</button>
    </form>
  </div>
</template>


<script>
import router from '@/router';
import { v4 as uuidv4 } from 'uuid'

export default {
  props: ['socket'],
  data() {
    return {
      username: null,
      myVideoStream: null,
      roomId: null
    }
  },
  methods: {
    joinRoom() {
      if (!this.username) {
        return
      }
      if (!this.roomId) {
        console.log(uuidv4())
        this.roomId = uuidv4()
      }
      this.socket.joinRoom(this.username, this.roomId)
      router.push({ name: 'room', params: { roomId: this.roomId, username: this.username } });
    }
  }
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

input {
  width: 100%;
  display: grid;
  margin: 10px 0px;
  transition: .3s border-color;
  box-sizing: border-box;
  height: 10vh;
}

#join_btn {
  width: 100%;
  margin: 40px 0px;
  height: 10vh;
}

#login_form {
  box-sizing: border-box;
  width: min(6in, 85vw);
}

.login {
  justify-content: center;
  align-items: center;
  display: flex;
  height: 90vh;
}

#login_form {
  padding: 10px;

  >* {
    box-sizing: border-box;
    background-color: $color-primary;
    color: $color-accent;
    border-radius: 100px;
    border: 4px solid $color-accent;
    font-weight: bold;
  }

  label {
    background-color: unset;
    border: none;
    left: 50px;
    position: relative;
    display: flex;
  }

  input {
    padding: 10px 50px;
    background-color: $color-dark;
    border: 2px solid $color-accent;
  }

  input:focus {
    outline: thick double $color-accent;
  }

  button {
    cursor: pointer;
    background-color: $color-primary;
  }
}
</style>
