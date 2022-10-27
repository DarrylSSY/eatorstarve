<template>

  <body>
    <div class="container-sm">
      <br>
      <div class="row">
        <div class="col text-center">
          <h1>Pre-Game Setup</h1>
        </div>
      </div>
      
    </div>
  </body>


</template>


<script>
import router from "@/router";
export default {
  name: "SetupView",
  data() {
    return {
      code: ""
    }
  },
  methods: {
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
