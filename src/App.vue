<template>
  <div id="app">
    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: "Press Start 2P", cursive, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
}

.mute-btn {
  position:fixed;
  bottom: 8px;
  right: 8px;
}

</style>
