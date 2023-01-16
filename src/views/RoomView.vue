<template>
  <div class="app-wrapper">
    <div class="main-view">
      <UserVideos />

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

    <ChachItem :class="{ chach_visible: isChachToogle }" :roomId="roomId" />
  </div>

</template>

<script>
import UserVideos from '@/components/UserVideos.vue';
import router from '@/router';

export default {
  props: ["socket", "roomId"],
  data() {
    return {
      isCameraToggle: false,
      isMicroToogle: false,
      isChachToogle: false
    };
  },
  methods: {
    leave() {
      router.push({ name: "login" });
    }
  },
  components: { UserVideos }
}
</script>

<style lang="scss">
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
</style>

