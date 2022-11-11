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

p, body, button {
  font-size: 16px;
}

/* img {
  height: 100px;
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
  img {
    height: 80px;
    width: 80px;
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
  img {
    height: 60px;
    width: 60px;
  }
}

@media (max-width: 576px) {
  h1 {
    font-size: 30px;
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
  img {
    height: 50px;
    width: 50x;
    size:20px
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
