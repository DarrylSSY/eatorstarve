<template>
  <QuestionComponent category="cuisine" :code="code" />
  <UsernameCheckerComponent />
</template>

<script>
import router from "@/router";
import { useSessionStore } from '../stores/session';
import QuestionComponent from "../components/QuestionComponent";
import UsernameCheckerComponent from "../components/UsernameCheckerComponent";

export default {
  name: "Question1View",
  components: {
    UsernameCheckerComponent,
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