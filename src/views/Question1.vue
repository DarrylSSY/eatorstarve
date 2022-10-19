<template>
  <button @click="next">Next</button>
  Hi {{username}}, this is Question 1 {{code}}
  <button @click="home">Home</button>
  <QuestionComponent category="abc" :code="code" />
=======
  <button v-on:click="next">Next</button>
  Hi {{username}}, this is Question 1 {{code}}
  <button v-on:click="home">Home</button>
  <QuestionComponent category="spice" :code="code" />
>>>>>>> Stashed changes
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

</style>