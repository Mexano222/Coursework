<template>
  <div class="login">
    <form action="" id="login_form">

      <label for="usename">Nickname</label>
      <input type="text" placeholder="Enter username" v-model="username" id="usename">
      <label for="room_id">Room ID</label>
      <input type="text" placeholder="Enter room id" v-model="roomId" id="room_id">

      <button @click="joinRoom(username, roomId)" id="join_btn">Join</button>
    </form>
  </div>
</template>


<script>
import router from '@/router';

export default {
  created() {
    console.log(this.socket.getId())
  },
  props: ['socket'],
  data() {
    return {
      username: this.socket.getId(),
      roomId: null
    }
  },
  methods: {
    joinRoom(username, roomId) {
      if (!this.username) {
        return
      }
      if (!this.roomId) {
        return
      }
      this.username = username;
      this.socket.joinRoom(username, roomId)
      router.push({ name: 'room', params: { roomId: roomId } });
    }
  }
}

</script>

<style lang="scss">
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
</style>
