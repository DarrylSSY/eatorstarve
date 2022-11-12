<template>
  <!-- START for Slider Template -->
  <dialog id="dialog-rounded" class="nes-dialog is-rounded">
    <form method="dialog">
      <p class="title text-center">Are you sure you want to exit?</p>
      <p class="text-center">You cannot return to this page.</p>
      <menu class="dialog-menu p-0">
        <button class="nes-btn">Cancel</button>
        <button class="nes-btn is-primary" @click="home">Confirm</button>
      </menu>
    </form>
  </dialog>
  <div class="question-body row mx-0">
    <!-- Header (Quit button and progress bar) -->
    <div class="col-3 col-md-2 mt-2 px-0">
      <button
        type="button"
        class="nes-btn is-error pr-6"
        onclick="document.getElementById('dialog-rounded').showModal();"
      >
        Quit
      </button>
    </div>
    <div class="col-9 col-md-10 pe-2 h-10 mt-2">
      <progress
        class="nes-progress"
        :class="color"
        :value="progress"
        max="100"
      ></progress>
    </div>
    <!-- <div class="col-1 col-md-0"></div> -->
    <div class="col-1 col-md-0"></div>
    <div class="nes-container is-rounded col-10 col-md-10 px-5 game-options">
      <div class="row mt-5"></div>
      <div class="row mt-auto">
        <input
          v-model="value"
          type="range"
          class="form-range"
          max="2"
          @mouseup="nextpage()"
          @touchend="nextpage()"
        />
      </div>
      <div class="row mt-4 justify-content-evenly">
        <h6 class="col-2 text-center ps-0">{{ foption0 }}</h6>
        <span class="col-3"></span>
        <h6 class="col-2 text-center ps-0">{{ foption1 }}</h6>
        <span class="col-3"></span>
        <h6 class="col-2 text-center ps-0">{{ foption2 }}</h6>
      </div>
    </div>
  </div>

  <!--Slider Options -->

  <div class="dialogue-box container p-0">
    <!-- Question number, health bar and username -->
    <div class="col-12 row px-0 mx-0 gy-1">
      <div
        class="info col-5 col-md-4 col-lg-3 col-xl-2 ps-0 py-0"
        style="height: 100%"
      >
        <!-- Username -->
        <div class="nes-container is-centered is-rounded p-2">
          {{ username }}
        </div>
      </div>
      <div
        class="info col-12 col-sm-8 col-md-7 col-lg-5 col-xl-4 col-xxl-3 ps-0 pt-0 info-box mb-2 px-0"
      >
        <div class="nes-container is-rounded py-2 px-0">
          <canvas id="canvas" height="20"></canvas>
        </div>
      </div>
    </div>

    <div
      class="chat-box container nes-container p-0 is-centered is-rounded col-12 my-0"
    >
      <img
        class="profile me-2"
        :src="'https://avatars.dicebear.com/api/pixel-art/' + username + '.svg'"
      />
      <h3 class="col-7 col-sm-9">
        {{ question_front }}{{ category }}{{ question_back }}
      </h3>
    </div>
  </div>

  <!-- END for Slider Template -->
</template>

<script>
import { useSessionStore } from "../stores/session";
import axios from "axios";
import router from "@/router";
import { Layout, Rive } from "@rive-app/canvas";
import DialogueBox from "./DialogueBox.vue";

export default {
  name: "SliderComponent",
  props: {
    category: String,
    code: String,
  },
  setup() {
    const store = useSessionStore();
    return {
      username: store.getUsername,
    };
  },
  data() {
    return {
      foption0: "Loading",
      foption1: "Loading",
      foption2: "Loading",
      question_front: "Choose your ",
      question_back: " !",
      next: "Question2",
      progress: 0,
      color: "",
      timer: null,
      value: 1,
    };
  },
  mounted() {
    this.$timer = new Rive({
      src: "../../timer.riv",
      canvas: document.getElementById("canvas"),
      layout: new Layout({ fit: "fitHeight", alignment: "right" }),
      autoplay: false,
      animations: "Timer",
    });
    let oof = new Audio("../../oof.mp3");

    this.$timer.play("Timer");
    this.$timer.on("stop", () => {
      oof.play();
      axios.post(`${process.env.VUE_APP_BACKEND_URL}api/answers`, {
        code: this.code,
        username: this.username,
        answer: this.value,
        category: this.category,
      });
      router.push({ name: this.next, params: { id: this.code } });
    });
    if (this.category == "cuisine") {
      this.next = "Question2";
      this.progress = 0;
      this.color = "";
      this.question_front = "Which ";
      this.question_back = " are you feeling?";
    } else if (this.category == "poultry") {
      this.next = "Question3";
      this.progress = 10;
      this.color = "is-error";
      this.question_front = "Select your ";
      this.question_back = "!";
    } else if (this.category == "price") {
      this.next = "Question4";
      this.progress = 25;
      this.color = "is-error";
      this.question_front = "Indicate the ";
      this.question_back = " level!";
    } else if (this.category == "texture") {
      this.next = "Question5";
      this.progress = 40;
      this.color = "is-warning";
      this.question_front = "Which ";
      this.question_back = " do you prefer?";
    } else if (this.category == "base") {
      this.next = "Question6";
      this.progress = 55;
      this.color = "is-warning";
      this.question_front = "Indicate your ";
      this.question_back = " choice.";
    } else if (this.category == "spice") {
      this.next = "Question7";
      this.progress = 75;
      this.color = "is-success";
      this.question_front = "What is your ";
      this.question_back = " tolerance level?";
    } else {
      this.next = "Holding";
      this.progress = 90;
      this.color = "is-success";
      this.question_front = "Want some ";
      this.question_back = "?";
    }
    axios
      .get(`${process.env.VUE_APP_BACKEND_URL}api/questions/${this.category}`)
      .then((response) => {
        this.foption0 = response["data"][0]["answer"];
        this.foption1 = response["data"][1]["answer"];
        this.foption2 = response["data"][2]["answer"];
      });
  },
  beforeUnmount() {
    this.$timer.unsubscribeAll();
  },
  methods: {
    nextpage: function () {
      axios.post(`${process.env.VUE_APP_BACKEND_URL}api/answers`, {
        code: this.code,
        username: this.username,
        answer: this.value,
        category: this.category,
      });
      let optionpress = new Audio("../../optionpress.mp3");
      optionpress.play();
      router.push({ name: this.next, params: { id: this.code } });
    },
    home: function () {
      router.push("/");
    },
    components: { DialogueBox },
  },
};
</script>

<style scoped>
.nes-btn {
  height: 56px;
  width: calc(100% - 8px);
}

.nes-progress {
  width: calc(100% - 8px);
  height: 56px;
}

canvas {
  padding: 0px;
}

.game-options {
  height: fit-content;
}
.chat-box {
  height: 136px;
  width: calc(100% - 8px);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  bottom: 0px;
}

.nes-container {
  background-color: #ffffff;
}

.profile {
  width: 15vw;
  right: -15px;
  position: absolute;
  bottom: -4px;
}

.question-body {
  height: 60vh;
}

.info {
  height: 50px;
}

.dialogue-box {
  position: absolute;
  bottom: 3px;
}


.info-box {
  height: 60px;
  margin-bottom: 20px;
}

</style>
