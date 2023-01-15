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
      <div id="messages"></div>
    </div>
    <form id="form-message" action="">
      <input id="input-message" autocomplete="off" />
      <button>send</button>
    </form>
  </div>
</template>
<style>
.control-btn {
  cursor: pointer;

  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  width: 1.5em;
  height: 1.5em;
  border-radius: 100%;
  color: #fff;
  background: #0f0;
  border-radius: 100px;
}

#room_leave {
  background-color: red;
}
</style>

