<!--This checks if the user currently has a username, else it will show error-->
<template>
  <dialog v-if="!username" class="nes-dialog" id="dialog-default">
    <form method="dialog">
      <p class="title">Uh oh!</p>
      <p>You are currently not in the game</p>
        <button @click="home" class="nes-btn is-primary">Exit</button>
    </form>
  </dialog>
</template>

<script>
import {useSessionStore} from "@/stores/session";
import router from "@/router";

export default {
  name: "UsernameCheckerComponent.vue",
  setup () {
    const store = useSessionStore()
    return {
      username: store.getUsername
    }
  },
  mounted() {
    if ( document.getElementById('dialog-default')) {
      document.getElementById('dialog-default').showModal();
    }
  },
  methods: {
    home: function (){
      let buttonpress = new Audio("../../buttonpress.mp3");
      buttonpress.play()
      router.push("/")
    },
  }
}
</script>

<style scoped>

</style>