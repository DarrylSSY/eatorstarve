<template>
  <body>
    <div class="container-sm p-0">
      <QuestionComponent category="price" :code="code" />
      <UsernameCheckerComponent />
    </div>
  </body>
</template>

<script>
import router from "@/router";
import { useSessionStore } from '../stores/session';
import SliderComponent from "../components/SliderComponent";
import UsernameCheckerComponent from "../components/UsernameCheckerComponent";

export default {
  name: "Question3View",
  components: {
    UsernameCheckerComponent,
    SliderComponent
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
      rgba(153, 237, 130, 0.66),
      rgba(153, 237, 130, 0.66)
  ),
  url(../assets/bgprice.jpg);
}
.container {
  height: 100%;
}

.container-sm {
  height: 100%;
}
</style>