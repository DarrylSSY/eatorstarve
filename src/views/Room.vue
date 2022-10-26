<template>
  <div class="container-sm">
    <input v-model="currentUsername" placeholder="username"/>
    <button @click="play">Play</button>
    Hi, this is the room page for room code {{code}}
    <button @click="home">Home</button>
    <button @click="copy_link">Copy Link</button>
  </div>
</template>

<script>
import router from "@/router";
import { useSessionStore } from '../stores/session';

export default {
  name: "RoomView",
  data() {
    return {
      code: this.$route.params.code,
      currentUsername: "",
    }
  },
  methods: {
    play: function (){
      const username = useSessionStore()
      username.setUsername(this.currentUsername)
      router.push({ name: 'Question1', props: true})
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