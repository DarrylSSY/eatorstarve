<template>
  <body>
    <div class="container-sm p-0">
      <QuestionComponent category="base" :code="code" />
      <UsernameCheckerComponent />
    </div>
  </body>
</template>

<script>
import router from "@/router";
import { useSessionStore } from '../stores/session';
import QuestionComponent from "../components/QuestionComponent";
import UsernameCheckerComponent from "../components/UsernameCheckerComponent";

export default {
  name: "Question5View",
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
body {
  height: 100%;
  background: linear-gradient(
      0deg,
      rgba(139, 229, 247, 0.66),
      rgba(139, 229, 247, 0.66)
  ),
  url(../assets/bgbase.jpg);
}
.container {
  height: 100%;
}

.container-sm {
  height: 100%;
}
</style>