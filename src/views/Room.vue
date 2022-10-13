<template>
  <input v-model="username" placeholder="username"/>
  <button v-on:click="play">Play</button>
  Hi, this is the room page for room code {{code}}
  <button v-on:click="home">Home</button>
  <button v-on:click="copy_link">Copy Link</button>
</template>

<script>
import router from "@/router";

export default {
  name: "RoomView",
  data() {
    return {
      code: this.$route.params.code,
      username: ""
    }
  },
  methods: {
    play: function (){
      router.push({ name: 'Question1', query: {username: 'hihi'}, props: true})
    },
    home: function (){
      router.push("/")
    },
    copy_link: async function (){
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard")
      } catch($e) {
        alert("Error copying link to clipboard")
      }

    }
  }
}
</script>

<style scoped>

</style>