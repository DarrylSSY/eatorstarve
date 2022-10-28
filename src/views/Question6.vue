<template>
  <div class="container-sm">
    <QuestionComponent category="spice" :code="code" />
    <UsernameCheckerComponent />
  </div>
</template>

<script>
import router from "@/router";
import { useSessionStore } from '../stores/session';
import QuestionComponent from "../components/QuestionComponent";
import UsernameCheckerComponent from "../components/UsernameCheckerComponent";

export default {
  name: "Question6View",
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
      router.push({ name: 'Holding', params: {id:this.code} })
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