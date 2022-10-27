<template>
  <body>
    <div class="container-sm">
      <br>
      <div class="d-flex align-items-center flex-column">
        <div class="row mb-5 pb-5">
          <div class="col-12 col-md-auto">
            <h1 class="text-center">Eat or Starve</h1>
          </div>
        </div>

        <div class="row pt-5 mt-5">
          <div class="col-md-auto">
            <div id="container2" class="container d-flex align-items-center flex-column">
              <div class="row">
                <input v-model="code" placeholder="RoomCode" />
              </div>
              <div class="row">
                <button @click="join">Join</button>
              </div>

              <span class="align-middle"> ---OR--- </span>

              <div class="row">
                <button type="button" @click="create">Create</button>
              </div>
            </div>
          </div>
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
#container2 {
  padding: 22px 22px;
  gap: 16px;

  background: #ededed;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
}

input {
  width: 383.48px;
  height: 64px;
  background: #ededed;
  border: 3px solid rgba(245, 200, 95, 0.5);
  border-radius: 20px;
  text-align: center;

  color: rgba(245, 200, 95, 0.5);
}

button {
  width: 383.48px;
  height: 64px;

  background: #f5c85f;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
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
