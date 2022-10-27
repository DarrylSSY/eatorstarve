<template>
  <div class="container-sm">
    <br>
    <h1>Pre-Game Setup</h1>
  </div>

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
