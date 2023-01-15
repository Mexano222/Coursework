<template>
  <div id="login_screen">
    <form action="" id="text_fields">

      <input type="text" placeholder="Enter username" v-model="username" id="usename">
      <input type="text" placeholder="Enter room id" v-model="roomId" id="room_id">

      <button @click="joinRoom(username, roomId)" id="join_btn">Join</button>
    </form>
  </div>
</template>


<script>
import router from '@/router';


export default {

  data() {
    return {
      username: null
    }
  },

  methods: {
    joinRoom(username, roomId) {
      this.username = username;
      router.push({ name: 'room', params: { roomId: roomId } });
    }

  }

}

</script>

<style>
input {
  font-size: 16px;
  padding: 10px;
  display: grid;
  width: 100%;
  margin: 5px 0px 5px 0px;
  border-radius: 10px;
  border: 1px solid rgb(99, 97, 97);
  transition: .3s border-color;
  box-sizing: border-box;
  height: 45px;
}

input:hover {
  border: 1px solid rgb(0, 0, 0);
}

#join_btn {
  cursor: pointer;

  padding: 10px;
  border: none;
  background-color: #3F51B5;
  color: #fff;
  font-weight: 600;
  border-radius: 10px;
  width: 100%;
  margin: 5px 0px 5px 0px;
  box-sizing: border-box;
  height: 45px;
}

#text_fields {
  box-sizing: border-box;
}

#login_screen {
  justify-content: center;
  align-items: center;
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%)
}
</style>
