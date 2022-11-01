<template>
  <body>
    <div class="container-sm">
      <div class="row">
        <div class="col-12 gy-4">
          <h1 class="text-center">Eat or Starve</h1>
        </div>
        <div
          class="col-10 col-md-8 col-lg-6 col-xl-4 offset-1 offset-md-2 offset-lg-3 offset-xl-4 gy-5"
        >
          <div class="nes-container is-rounded is-centered">
            <!-- room code input -->
            <input
              v-model="code"
              type="text"
              class="nes-input is-primary my-4"
              placeholder="Room Code"
            />
            <!-- join button -->
            <button
              v-if="code != ''"
              type="button"
              class="nes-btn is-primary my-4"
              @click="join"
            >
              Join
            </button>

            <button v-else type="button" class="nes-btn is-disabled my-2">
              Join
            </button>
            <div class="my-2"> --- OR --- </div>
            <!-- create room button -->
            <button type="button" class="nes-btn is-warning my-2" @click="create">
              Create
            </button>
          </div>
        </div>
        <!-- bottom speech bubble with cat -->
        <div class="col-11 align-self-start offset-1 gy-5">
          <div class="nes-balloon from-left">
            <div>
              Welcome to <b>Eat or Starve</b> where we help to give suggestions
              on where your next food adventure should be. <br /><br />
              Simply create a new game or join one hosted by your friend to
              kickstart the game of choice!
            </div>
          </div>
        </div>
        <div class="col-1">
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
}

.nes-container {
  background-color: #ededed;
  height: fit-content;
}

span {
  width: 100%;
}
</style>
