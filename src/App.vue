<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: "App",
  data() {
    return {
      music: ""
    };
  },
  watch: {
    $route() {
      this.music.play()

    },
  },
  created() {
    this.music = new Audio("../../bgm.mp3");
  },
};
</script>

<style>
#app {
  font-family: "Press Start 2P", cursive, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}
.nes-btn {
  width: 100%;
}

.nes-input {
  width: 100%;
  font-size: 16px;
}

h1 {
  font-size: 60px;
}

h2 {
  font-size: 50px;
}
h3, h6{
  font-size: 40px;
}

p, body, button {
  font-size: 16px;
}

/* img {
  height: 20vh;
  width: 100px;
} */

@media (max-width: 992px) {
  h1 {
    font-size: 50px;
  }
  h2 {
    font-size: 40px;
  }
  p,
  body,
  .nes-input,
  button {
    font-size: 14px;
  }
  h3, h4, h6{
    font-size: 30px;
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 40px;
  }
  h2 {
    font-size: 30px;
  }
  p,
  body,
  .nes-input,
  button  {
    font-size: 12px;
  }
  h3, h4, h6{
    font-size: 20px;
  }

}

@media (max-width: 576px) {
  h1 {
    font-size: 25px;
  }
  h2 {
    font-size: 20px;
  }
  p,
  body,
  .nes-input,
  button  {
    font-size: 10px;
  }
  h3, h4{
    font-size: 15px;
  }
  h6{
    font-size: 10px;
  }

}

.mute-btn {
  position: fixed;
  bottom: 8px;
  right: 8px;
}

html {
  height: 100vh;
}

body {
  height: 100vh;
}
</style>
