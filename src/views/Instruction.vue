<template>

  <body>
    <div class="container-sm">
      <div class="row">
        <div class="col-12 gy-4 text-center">
          <h1>Instructions</h1>
        </div>

        <div class="col-10 col-md-8 offset-1 offset-md-2 gy-5">
          <div class="nes-container is-rounded">
            <div>
              <b>How to play:</b>
              <br><br>
              <div class="d-flex flex-row  align-items-center">
                <i class="nes-icon is-medium heart pe-4"></i>There are a total of 7 questions.
              </div><br>
              <div class="d-flex flex-row  align-items-center">
                <i class="nes-icon is-medium heart pe-4"></i>For each question, select one answer.
              </div><br>
              <div class="d-flex flex-row  align-items-center">
                <i class="nes-icon is-medium heart pe-4"></i>Watch out for your health as there is a 10s time limit for
                each question.
              </div><br>
            </div>
          </div>
        </div>

        <div class="col-8 col-md-6 offset-2 offset-md-3  gy-5">
          <button type="button" class="nes-btn is-warning" @click="start">Play!</button>
        </div>
      </div>
    </div>

  </body>
</template>

<script>
import router from "@/router";
import { useSessionStore } from "../stores/session";
//import axios from "axios";

export default {
  name: "InstructionView",
  setup() {
    const store = useSessionStore();
    return {
      username: store.getUsername,
    };
  },
  methods: {
    start: function (){
      //fix button sound now cant play
      let buttonpress = new Audio("../../../buttonpress.mp3");
      buttonpress.play();
      router.push({ name: "Starting", props: true });
    },
  },
};
</script>

<style scoped>
body {
  background: linear-gradient(0deg,
      rgba(245, 200, 95, 0.66),
      rgba(245, 200, 95, 0.66)),
    url(../assets/bg1.jpeg);
}

.nes-container {
  background: white
}
</style>
