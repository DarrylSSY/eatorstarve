<template>

  <body>
    <div class="container text-center">
      <div class="row my-5 py-5 pt-0 mt-0">
        <h1>Eat or Starve</h1>
      </div>

      <div class="row my-5 py-5">
        <div class="col-12">
          <input v-model="code" placeholder="RoomCode" />
          <button @click="join">Join</button>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <img style="width: 100px" src="https://avatars.dicebear.com/api/pixel-art/nick.png">
          <!-- Balloon -->
          <div class="nes-balloon from-left">
            <p>New here? Click <a @click="create"><button type="button" class="nes-btn is-warning">Create</button></a> ! </p>
            <!-- <button >Create</button> -->
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
      code: ""
    }
  },
  methods: {
    join: function () {
      // Incomplete code
      // Check if room exists
      let error = false

      // If don't exist or code empty, give error
      if (error || this.code == "") {
        alert("Room doesn't exist")
      }
      // Else go to room
      else {
        router.push("room/" + this.code)
      }
    },
    create: function () {
      // Incomplete code
      // Generate random code
      let generated_code = Math.random().toString(36).slice(9)
      // Check if room exists

      let error = false
      // Keep generating until room doesn't exist
      while (error) {
        generated_code = Math.random().toString(36).slice(9)
        error = false
      }
      // Else create room
      router.push("room/" + generated_code)
    }
  }
}
</script>

<style scoped>
body {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: -8px;
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;

  background: linear-gradient(0deg, rgba(245, 200, 95, 0.66), rgba(245, 200, 95, 0.66)), url(../assets/bg1.jpeg);
  box-shadow: 7px 12px 18px rgba(0, 0, 0, 0.25);

}
h1{
  font-size: 70px;
}
</style>