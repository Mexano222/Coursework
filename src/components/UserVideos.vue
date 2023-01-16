<template>
  <div class="video-wrapper">
    <div class="cam-wrapper" v-for="user in users" :key="user.name"
         :style="{ flex: '0 0 calc(100%/' + Math.ceil(Math.sqrt(Math.max(users.length, 2))) + ')' }">
      <div class="user-cam">
        <label>{{ user.name }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        { name: "123" },
        { name: "123" },
        { name: "123" },
        { name: "123" },
        { name: "123" },
        { name: "123" },
        { name: "123" },
        { name: "123" },
      ],
    }
  },
  mounted() {
    console.log(this.$parent.roomId);
  }
}
</script>

<style lang="scss">
.video-wrapper {
  max-height: 95vh;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.cam-wrapper {
  flex-direction: column;
}

.user-cam {
  box-sizing: border-box;
  width: 100%;
  height: 0;
  position: relative;
  border: 1px solid #0f0;
  padding-top: 56.25%;

  >* {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>