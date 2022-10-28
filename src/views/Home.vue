<template>

  <body>
    <div class="container-sm">
      <br />
      <div class="row">
        <div class="col-12">
          <h1 class="text-center">Eat or Starve</h1>
        </div>

        <div class="row">
          <div class="col-12 col-md-12 col-lg-8 mx-auto">
            <div class="nes-container is-rounded is-centered my-5 mx-auto">
              <div class="row">
                <div class="col">
                  <input v-model="code" type="text" class="nes-input is-primary" placeholder="RoomCode" />
                </div>
              </div>

              <div class="row my-3">
                <div class="col">
                  <button type="button" class="nes-btn is-warning" @click="join">
                    Join
                  </button>
                </div>
              </div>

              <div class="row text-center">
                <div class="col">
                  <span class="align-middle"> ---OR--- </span>
                </div>
              </div>

              <div class="row my-3">
                <div class="col">
                  <button type="button" class="nes-btn is-warning" @click="create">
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mx-5">
          <div class="nes-balloon from-left col-10">
            <p>
              Welcome to <b>Eat or Starve</b> where we help to give suggestions on
              where your next food adventure should be. <br /><br />
              Simply create a new game or join one hosted by your friend to
              kickstart the game of choice!
            </p>
          </div>
        </div>

        <div class="row">
          <i class="nes-octocat animate pl-3 mt-2"></i>
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
      logo: "Eat or Starve",
    };
  },
  methods: {
    join: function () {
      // Incomplete code
      // Check if room exists
      let error = false;

      // If don't exist or code empty, give error
      if (error || this.code == "") {
        alert("Room doesn't exist");
      }
      // Else go to room
      else {
        router.push("room/" + this.code);
      }
    },
    create: function () {
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

  color: grey;
}

button {
  width: 100%;
  height: 100%;
  /* bg color not working */
  background-color: #f5c85f;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

h1 {
  font-size: 60px;
}

body {
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg,
      rgba(245, 200, 95, 0.66),
      rgba(245, 200, 95, 0.66)),
    url(../assets/bg1.jpeg);
  box-shadow: 7px 12px 18px rgba(0, 0, 0, 0.25);
}

.nes-container {
  width: 50%;
  background-color: #EDEDED;;
}
</style>
