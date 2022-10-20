<template>
  <div>
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
    <p>Hi {{username}}, this is Question 1</p>
  </div>
  
  <!-- <button @click="next">Next</button>
  Hi {{username}}, this is Question 1
  <button @click="home">Home</button> -->
  <QuestionComponent category="spice" :code="code" />
</template>

<script>
import router from "@/router";
import { useSessionStore } from '../stores/session';
import QuestionComponent from "../components/QuestionComponent";

export default {
  name: "Question1View",
  components: {
    QuestionComponent
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

    }
  },
  methods: {
    next: function (){
      router.push({ name: 'Question2', params: {id:this.code} })
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