<template>
  <body>
    <div class="container-sm">
      <br />
        <div class="row">
          <div class="col-12">
            <h1 class="text-center">Eat or Starve</h1>
          </div>

        <div class="row">
          <div class="col-2"></div>
          <div class="col-8">
            <div class="nes-container is-rounded mt-5 is-centered">
                  <div class="row">
                    <div class="col">
                      <input v-model="code" type="text" class="nes-input is-primary" placeholder="RoomCode"/>
                    </div>
                  </div>

                  <div class="row my-3">
                    <div class="col">
                      <button type="button" class="nes-btn is-warning" @click="join">Join</button>
                    </div>
                  </div>

                  <div class="row text-center my-3">
                    <div class="col">
                      <span class="align-middle"> ---OR--- </span>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col">
                      <button type="button" class="nes-btn is-warning" @click="create">Create</button>
                    </div>
                  </div>
                </div>
          </div>
          <div class="col-2"></div>
        </div>
        

        <div class="row mx-5 mt-5">
          <div class="nes-balloon from-left col-8">
            <p>Hello NES.css</p>
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
  width: 342px;
  height: 64px;
  background: #ededed;
  /* border: 3px solid rgba(245, 200, 95, 0.5); */
  /* border-radius: 20px; */
  text-align: center;

  color: rgba(245, 200, 95, 0.5);
}

button {
  width: 342px;
  height: 64px;
  background: #f5c85f;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
h1 {
  font-size: 60px;
}
body {
  width: 100%;
  height: 100%;
  background: linear-gradient(
      0deg,
      rgba(245, 200, 95, 0.66),
      rgba(245, 200, 95, 0.66)
    ),
    url(../assets/bg1.jpeg);
  box-shadow: 7px 12px 18px rgba(0, 0, 0, 0.25);
} 
</style>
