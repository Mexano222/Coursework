<template>
  <header>
    <router-link to="/" id="logo">Discocrd</router-link>
  </header>

  <router-view :socket="this.socket" />
</template>
<script>
import SocketioService from './services/socketio.service';

export default {
  name: 'App',
  components: {},
  created() {
    SocketioService.setupSocketConnection();
    this.socket = SocketioService;
  },
  beforeUnmount() {
    this.socket.disconnect();
  },
  data() {
    return {
      socket: SocketioService
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

.center {
  justify-content: center;
  align-items: center;
  display: flex;
}

body {
  background-color: $color-background;
  color: $color-accent;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-weight: bold;
  font-size: 1.3rem;

  // overflow: hidden;
}

#app {
  margin: 0;
  padding: 0;
}

header {
  @extend .center;
  height: 5vh;
  background-color: $color-dark;
  border-bottom: 2px solid;
  box-sizing: border-box;

}

#logo {
  font-size: 36px;
  font-weight: bolder;
  color: $color-accent;
  text-decoration: none;
  padding: 10px;
}
</style>