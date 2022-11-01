<template>
  <div class="container-sm">
    <button type="button" class="nes-btn is-primary" onclick="document.getElementById('dialog-rounded').showModal();">
      Home
    </button>
    <dialog class="nes-dialog is-rounded" id="dialog-rounded">
      <form method="dialog">
        <p class="title">Are you sure you want to exit?</p>
        <p>Your progress will not be saved.</p>
        <menu class="dialog-menu">
          <button class="nes-btn">Cancel</button>
          <button class="nes-btn is-primary" @click="home">Confirm</button>
        </menu>
      </form>
    </dialog>
    <button type="button" class="nes-btn is-primary" @click="next">Next</button>
  </div>
  <div class="nes-container is-rounded">
    <p>Hi {{username}}, the following has completed</p>
    <ul>
      <li v-for="user in answered" v-bind:key="user" v-bind:user="user" >
        {{ user }}
      </li>
    </ul>
  </div>
  <GenerateResultsComponent :code="code"/>
</template>

<script>
import router from "@/router";
import { useSessionStore } from '../stores/session';
import axios from "axios";
import GenerateResultsComponent from "@/components/GenerateResultsComponent";

export default {
  name: "HoldingView",
  components: {
    GenerateResultsComponent,
  },
  setup() {
    const store = useSessionStore()
    return {
      username: store.getUsername
    }
  },
  data() {
    return {
      code: this.$route.params.code,
      answered: []


    }
  },
  mounted() {
    axios.get('http://localhost:8081/api/room/' + this.code).then(response => {
      this.answered = response.data
    })
  },
  methods: {
    next: function (){
      let buttonpress = new Audio("../../buttonpress.mp3");
      buttonpress.play()
      router.push({ name: 'Results', params: {id:this.code} })
    },
  },
}
</script>

<style scoped>

div.nes-container {
  margin:10px;
  position: sticky; /* This shit doesnt work */
  bottom: 0;
}

</style>