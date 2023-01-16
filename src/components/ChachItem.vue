<template>
  <div class="main-chat">
    <div class="main-chat-wrapper">
      <div class="messages-wrapper">
        <div id="messages">
          <div>
              Lol: asdasdasd
          </div>
        </div>
      </div>
      <div id="form-message" action="">
        <input id="input-message" placeholder="Message" autocomplete="off" v-model="message" />
        <button @click="sendMessage">send</button>
      </div>
    </div>
  </div>


</template>

<script>
export default
  {

    data() {
      return {
        isOpen: true
      }
    }
  }

</script>


<style lang="scss">
.main-chat-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  div {
    width: 100%;
  }
}

.messages-wrapper {
  margin-top: auto;
  min-height: 40px;
  background-color: red;

}
</style>