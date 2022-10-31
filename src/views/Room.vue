<template>
  <div class="container-sm">
    <input v-model="currentUsername" placeholder="username"/>
    <button @click="play">Play</button>
    Hi, this is the room page for room code {{code}}
    <button @click="home">Home</button>
    <button @click="copy_link">Copy Link</button>
    <RoomCheckerComponent :roomcode="code"/>
  </div>
</template>

<script>
import router from "@/router";
import { useSessionStore } from '../stores/session';
import RoomCheckerComponent from "../components/RoomCheckerComponent";

export default {
  name: "RoomView",
  components: {
    RoomCheckerComponent
  },
  data() {
    return {
      code: this.$route.params.code,
      currentUsername: "",
      bgm: null,
    }
  },
  mounted() {

  },
  methods: {
    play: function (){
      let buttonpress = new Audio("../../buttonpress.mp3");
      buttonpress.play()
      const username = useSessionStore()
      username.setUsername(this.currentUsername)
      router.push({ name: 'Question1', props: true})
    },
    home: function (){
      let buttonpress = new Audio("../../buttonpress.mp3");
      buttonpress.play()
      router.push("/")
    },
    copy_link: async function (){
      try {
        let buttonpress = new Audio("../../buttonpress.mp3");
        buttonpress.play()
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard")
      } catch($e) {
        alert("Error copying link to clipboard")
      }
    },
  }
}
</script>

<style scoped>

</style>