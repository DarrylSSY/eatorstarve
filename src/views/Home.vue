<template>
  <input v-model="code" placeholder="RoomCode"/>
  <button v-on:click="join">Join</button>
  <button v-on:click="create">Create</button>
  <button></button>
</template>

<script>
import router from "@/router";
export default {
  name: "RoomView",
  data () {
    return {
      code: ""
    }
  },
  methods: {
    join: function (){
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
    create: function (){
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

</style>