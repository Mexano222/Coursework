<template>
  <header>
    <router-link to="/" id="logo">Discocrd</router-link>
  </header>

  <router-view />
</template>

<style>
body {
  background-color: #121212;
}

#app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  min-height: 100px;
}

#logo {
  color: #e0e0e0;
  font-size: 48px;
  text-decoration: none;
  padding: 10px;
}
</style>
