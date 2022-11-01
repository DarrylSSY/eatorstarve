<template>
  <body>
    <div class="container-sm">
      <br />
      <div class="row gx-4 home-body">
        <div class="col-12">
          <h1 class="text-center">
            Eat or Starve
          </h1>
        </div>

        <div class="col-1 col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
        <div class="col-10 col-sm-10 col-md-8 col-lg-6 col-xl-4">
          <div class="nes-container is-rounded is-centered">
            <!-- room code input -->
            <div class="col-12">
              <input
                v-model="code"
                type="text"
                class="nes-input is-primary"
                placeholder="Room Code"
              />
            </div>
            <!-- join button -->
            <div class="col-12 my-2">
              <button
                v-if="code != ''"
                type="button"
                class="nes-btn is-primary"
                @click="join"
              >
                Join
              </button>

              <button v-else type="button" class="nes-btn is-disabled">
                Join
              </button>
            </div>
            <div class="col-12">
              <span class="align-middle"> --- OR --- </span>
            </div>
            <!-- create room button -->
            <div class="col-12 mt-2">
              <button type="button" class="nes-btn is-warning" @click="create">
                Create
              </button>
            </div>
          </div>
        </div>
        <div class="col-1 col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
        <!-- bottom speech bubble with cat -->
        <div class="col-1"></div>
        <div class="col-11">
          <div class="nes-balloon from-left">
            <div>
              Welcome to <b>Eat or Starve</b> where we help to give suggestions on where your next food
              adventure should be. <br /><br>
              Simply create a new game or join one hosted by your friend to
              kickstart the game of choice!
            </div>
          </div>
        </div>

        <div class="col-2">
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
  width: 100%;
  height: 100%;
  background: rgb(234, 234, 168);
  text-align: center;

  color: black;
}
#logo{
  color: green;
  font-weight: bold;
}
button {
  width: 100%;
}

body {
  height: 100%;

  background: linear-gradient(
      0deg,
      rgba(245, 200, 95, 0.66),
      rgba(245, 200, 95, 0.66)
    )
}

.container-sm {
  height: 100%;
}

.home-body {
}

.nes-container {
  background-color: #ededed;
  height: fit-content;
}
.nes-balloon {
  height: fit-content;
}
</style>
