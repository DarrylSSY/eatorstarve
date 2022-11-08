<template>
  <div></div>
</template>

<script>
// import router from "@/router";
import { useSessionStore } from "../stores/session";
// import axios from "axios";

export default {
  name: "InstructionView",
  setup() {
    const store = useSessionStore();
    return {
      username: store.getUsername,
    };
  },
};
</script>

<style scoped>
body {
  background: linear-gradient(
      0deg,
      rgba(245, 200, 95, 0.66),
      rgba(245, 200, 95, 0.66)
    ),
    url(../assets/bg1.jpeg);
}
</style>
