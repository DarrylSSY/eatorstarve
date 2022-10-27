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

<style>

</style>
