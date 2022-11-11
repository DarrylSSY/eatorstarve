<!--This checks if the user currently has a username, else it will show error-->
<template>
  <dialog v-if="status==='missing'" class="nes-dialog" id="dialog-default">
    <form method="dialog">
      <p class="title">Uh oh!</p>
      <p>Room does not exist</p>
        <button @click="home" class="nes-btn is-primary">Exit</button>
    </form>
  </dialog>
  <dialog v-if="status==='close'" class="nes-dialog" id="dialog-default">
    <form method="dialog">
      <p class="title">Uh oh!</p>
      <p>Game has ended. View results?</p>
      <button @click="results" class="nes-btn is-warning">Results</button>
      <button @click="home" class="nes-btn">Exit</button>
    </form>
  </dialog>
</template>

<script>
import router from "@/router";
import axios from "axios";

export default {
  name: "RoomCheckerComponent.vue",
  props: {
    roomcode: String,
  },
  data () {
    return {
      status: 'open'
    }
  },
  async mounted() {
    await axios.get(`${process.env.VUE_APP_BACKEND_URL}api/createdroom/${this.roomcode}`).then(response => {
      if (response.data == "open") {
        console.log("hi")
        this.status = "open"
      } else if (response.data == "close") {
        console.log("hi2")
        this.status = "close"
      } else {
        console.log("hi3")
        this.status = "missing"
      }
    })
    console.log(this.status)

    if (document.getElementById('dialog-default')) {
      document.getElementById('dialog-default').showModal();
    }
  },
  methods: {
    home: function (){
      let buttonpress = new Audio("../../buttonpress.mp3");
      buttonpress.play()
      router.push("/")
    },
    results: function (){
      let buttonpress = new Audio("../../buttonpress.mp3");
      buttonpress.play()
      router.push("/room/" + this.roomcode + "/result")
    },
  }
}
</script>

<style scoped>

.nes-dialog {
  width: fit-content;
  align-items: center;
  margin: auto;
}
</style>