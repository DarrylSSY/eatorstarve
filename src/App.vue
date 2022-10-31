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
h1 {
    font-size: 60px;
  }
@media (max-width: 992px) {
  h1 {
    font-size: 50px;
  }
}
@media (max-width: 768px) {
  h1 {
    font-size: 40px;
  }
}
@media (max-width: 576px) {
  h1 {
    font-size: 30px;
  }
}

.mute-btn {
  position:fixed;
  bottom: 8px;
  right: 8px;
}

</style>
