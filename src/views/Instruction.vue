<template>

  <body>
    <div class="container-sm">
      <div class="row">
        <div class="col-12 gy-4 gx-4 text-center">
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
              <div class="d-flex flex-row  align-items-center">
                <i class="nes-icon is-medium heart pe-4"></i>
                <p>If the time is up and you have not selected an answer. We will select for you! So, don't be INDECISIVE!
                <font-awesome-icon icon="fa-regular fa-face-grin-tongue-squint fs-2" /></p>
              </div><br>
              <div class="d-flex flex-row  align-items-center text-danger">
                <i class="nes-icon is-medium heart pe-4"></i>BE WARN that if you leave the game halfway, you cannot return back and will need to start over!
              </div><br>
            </div>
          </div>
        </div>

        <div class="col-8 col-md-6 offset-2 offset-md-3  mt-5 mb-2">
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
  display: block;
  overflow: auto;
}

.nes-container {
  background: white
}
.svg-inline--fa {
  font-size: 10px;
}
</style>
