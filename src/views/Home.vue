<template>
  <body>
    <div class="container-sm">
      <div class="row">
        <div class="col-12 gy-4 text-center">
          <h1>Eat or Starve</h1>
        </div>
        <div
          class="col-10 col-md-8 col-lg-6 col-xl-4 offset-1 offset-md-2 offset-lg-3 offset-xl-4 gy-5"
        >
          <div class="nes-container is-rounded is-centered">
            <!-- room code input -->
            <input
              v-model="code"
              class="nes-input is-primary my-2 mb-4"
              placeholder="Room Code"
              type="text"
            />
            <!-- join button -->
            <button
              v-if="code != ''"
              class="nes-btn is-primary my-2"
              type="button"
              @click="join"
            >
              Join
            </button>

            <button v-else class="nes-btn is-disabled my-2" type="button">
              Join
            </button>
            <div class="my-2">--- OR ---</div>
            <!-- create room button -->
            <button
              class="nes-btn is-warning my-2"
              type="button"
              @click="create"
            >
              Create
            </button>
          </div>
        </div>
        <!-- bottom speech bubble with cat -->
        <div class="col-11 align-self-start offset-1 gy-5 d-none d-md-block">
          <div class="nes-balloon from-left">
            <div>
              Welcome to <b>Eat or Starve</b> where we help to give suggestions
              on where your next food adventure should be. <br /><br />
              Simply create a new game or join one hosted by your friend to
              kickstart the game of choice!
            </div>
          </div>
        </div>
        <div class="col-12 gy-5 d-block d-md-none">
          <div class="nes-container is-rounded is-centered">
            Welcome to <b>Eat or Starve</b> where we help to give suggestions on
            where your next food adventure should be. <br /><br />
            Simply create a new game or join one hosted by your friend to
            kickstart the game of choice!
          </div>
        </div>

        <div class="col-1 d-none d-md-block">
          <i class="nes-octocat animate"></i>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import router from "@/router";

export default {
  name: "RoomView",
  data() {
    return {
      code: "",
    };
  },
  methods: {
    join: function () {
      let buttonpress = new Audio("../../buttonpress.mp3");
      buttonpress.play();

      router.push("room/" + this.code);
    },
    create: function () {
      let buttonpress = new Audio("../../buttonpress.mp3");
      buttonpress.play();
      router.push("setup");
    },
  },
};
</script>

<style scoped>
input {
  background: rgb(234, 234, 168);
  text-align: center;
}

body {
  background: linear-gradient(
      0deg,
      rgba(245, 200, 95, 0.66),
      rgba(245, 200, 95, 0.66)
    ),
    url(../assets/bg1.jpeg);
  display: block;
  overflow: auto;
}

.nes-container {
  background-color: #ededed;
  height: fit-content;
}

span {
  width: 100%;
}
</style>
