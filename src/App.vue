<template>
  <div id="app">
    <button class="nes-btn mute-btn" @click="playmusic">Toggle BGM</button>
    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      music: null,
    }
  },
  mounted() {
    this.bgm = new Audio("../../bgm.mp3");
  },
  updated() {
  },
  methods: {
    playmusic: function (){
      if (this.bgm.paused) {
        this.bgm.play();
      } else {
        this.bgm.pause();
      }
    },
  }
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
