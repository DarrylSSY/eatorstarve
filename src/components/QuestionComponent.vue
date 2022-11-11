<template>
  <div v-if="category == 'price' || category == 'spice'">
    <!-- START for Slider Template -->
    <dialog id="dialog-rounded" class="nes-dialog is-rounded">
      <form method="dialog">
        <p class="title">Are you sure you want to exit?</p>
        <p>Your progress will not be saved.</p>
        <menu class="dialog-menu p-0">
          <button class="nes-btn">Cancel</button>
          <button class="nes-btn is-primary" @click="home">Confirm</button>
        </menu>
      </form>
    </dialog>
    <div class="question-body row gx-4">
      <!-- Header (Quit button and progress bar) -->
      <div class="col-12"></div>
      <div class="col-4 col-md-2 ps-0">
        <button
          type="button"
          class="nes-btn is-error"
          onclick="document.getElementById('dialog-rounded').showModal();"
        >
          Quit
        </button>
      </div>
      <div class="col-8 col-md-10 pe-0">
        <progress
          class="nes-progress"
          :class="color"
          :value="progress"
          max="100"
        ></progress>
      </div>

    <!--Slider Options -->
    <div class="col-1 col-md-0"></div>
    <div class="nes-container is-rounded col-10 col-md-10 game-options">
      <div class="row mt-5"></div>
      <div class="row mt-auto">
          <input v-model="value" type="range" class="form-range" max="2" id="blank" @mouseup="nextpage()">
      </div>
      <div class="row mt-4 justify-content-evenly">
        <h6 class="col-2 text-center ps-0">{{ foption0 }}</h6>
        <span class="col-3"></span>
        <h6 class="col-2 text-center ps-0">{{ foption1 }}</h6>
        <span class="col-3"></span>
        <h6 class="col-2 text-center ps-0">{{ foption2 }}</h6>
      </div>
    </div>
    
      <!-- Question number, health bar and username -->
      <div class="col-12 row px-0 mx-0 mb-2 mt-auto">
        <div class="info col-5 col-md-2 ps-0 py-0">
          <!-- Username -->
          <div class="nes-container is-centered is-rounded">
            {{ username }}
          </div>
        </div>
        <div class="info col-9 col-md-5 ps-0">
          <div class="nes-container is-rounded">
            <canvas id="canvas" height="20"></canvas>
          </div>
        </div>
      </div>

      <div class="chat-box nes-container is-centered is-rounded col-12 my-0">
        <img
          class="profile"
          v-bind:src="
            'https://avatars.dicebear.com/api/pixel-art/' + username + '.svg'
          "
        />
        <h4>{{ question_front }}{{ category }}{{ question_back }}</h4>
      </div>
    </div>

  <!-- END for Slider Template -->
  </div> 
  <div v-else>
    <!-- START for 2 Question Template -->
    <dialog id="dialog-rounded" class="nes-dialog is-rounded">
      <form method="dialog">
        <p class="title">Are you sure you want to exit?</p>
        <p>Your progress will not be saved.</p>
        <menu class="dialog-menu p-0">
          <button class="nes-btn">Cancel</button>
          <button class="nes-btn is-primary" @click="home">Confirm</button>
        </menu>
      </form>
    </dialog>
    <div class="question-body row">
      <!-- Header (Quit button and progress bar) -->
      <div class="col-12"></div>
      <div class="col-4 col-md-2 ps-0">
        <button
          type="button"
          class="nes-btn is-error"
          onclick="document.getElementById('dialog-rounded').showModal();"
        >
          Quit
        </button>
      </div>
      <div class="col-8 col-md-10 pe-0">
        <progress
          class="nes-progress"
          :class="color"
          :value="progress"
          max="100"
        ></progress>
      </div>
      <!-- Options -->
      <div class="col-1 col-md-0"></div>
      <div class="nes-container is-rounded col-10 col-md-10 game-options">
        <button
          type="button"
          class="game-option nes-btn"
          :class="btn_state_1"
          @click="option1"
        >
          <h3>{{ answer1 }}</h3>
        </button>
        <div class="auto-layout">

          <h4>-- OR --</h4>

        </div>
        <button
          type="button"
          class="game-option nes-btn"
          :class="btn_state_2"
          @click="option2"
        >
          <h3>{{ answer2 }}</h3>
        </button>
      </div>

      <!-- Question number, health bar and username -->
      <div class="col-12 row px-0 mx-0 mb-2 mt-auto">
        <div class="info col-5 col-md-2 ps-0 py-0">
          <!-- Username -->
          <div class="nes-container is-centered is-rounded word-wrap">
            {{ username }}
          </div>
        </div>
        <div class="info col-7 col-md-5 ps-0">
          <div class="nes-container is-rounded">
            <canvas id="canvas" height="20"></canvas>
          </div>
        </div>
      </div>

      <div class="chat-box nes-container is-centered is-rounded col-12 my-0">
        <img
          class="profile"
          v-bind:src="
            'https://avatars.dicebear.com/api/pixel-art/' + username + '.svg'
          "
        />
        <h4>{{ question_front }}{{ category }}{{ question_back }}</h4>
      </div>
    </div>
  <!-- END of 2 Question Template -->
  </div>
</template>

<script>
import { useSessionStore } from "../stores/session";
import axios from "axios";
import router from "@/router";
import { Rive, Layout } from "@rive-app/canvas";
export default {
  name: "QuestionComponent",
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
      answer1: "Loading",
      answer2: "Loading",
      foption0: "Loading",
      foption1: "Loading",
      foption2: "Loading",
      btn_state_1: "is-disabled",
      btn_state_2: "is-disabled",
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
      console.log("ended");
      oof.play();
      axios.post(`${process.env.VUE_APP_BACKEND_URL}api/answers`, {
        code: this.code,
        username: this.username,
        answer: this.answer1,
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
    function generate2RandomNumber(x) {
      let num1 = Math.floor(Math.random() * x);
      let num2 = Math.floor(Math.random() * x);
      if (num1 == num2) {
        if (num2 > 0) {
          num2 = num2 - 1;
        } else if (num2 < x) {
          num2 = num2 + 1;
        }
      }
      return [num1, num2];
    }
    axios
      .get(`${process.env.VUE_APP_BACKEND_URL}api/questions/${this.category}`)
      .then((response) => {
        let randomNum = generate2RandomNumber(response["data"].length);
        this.answer1 = response["data"][randomNum[0]]["answer"];
        this.answer2 = response["data"][randomNum[1]]["answer"];
        if (this.category == 'price' || this.category == 'spice') {
          this.foption0 = response["data"][0]["answer"];
          this.foption1 = response["data"][1]["answer"];
          this.foption2 = response["data"][2]["answer"];
        }
        this.btn_state_1 = "is-primary";
        this.btn_state_2 = "is-warning";
      });
  },
  beforeUnmount() {
    this.$timer.unsubscribeAll();
  },
  methods: {
    option1: function () {
      axios.post(`${process.env.VUE_APP_BACKEND_URL}api/answers`, {
        code: this.code,
        username: this.username,
        answer: this.answer1,
        category: this.category,
      });
      let optionpress = new Audio("../../optionpress.mp3");
      optionpress.play()
      router.push({ name: this.next, params: { id: this.code } });
    },
    option2: function () {
      console.log(this.username + "selected" + this.answer2);
      axios.post(`${process.env.VUE_APP_BACKEND_URL}api/answers`, {
        code: this.code,
        username: this.username,
        answer: this.answer2,
        category: this.category,
      });
      let optionpress = new Audio("../../optionpress.mp3");
      optionpress.play()
      router.push({ name: this.next, params: { id: this.code } });
    },
    nextpage: function () {
      console.log(this.username + "selected" + this.value);
      axios.post(`${process.env.VUE_APP_BACKEND_URL}api/answers`, {
        code: this.code,
        username: this.username,
        answer: this.value,
        category: this.category,
      });
      let optionpress = new Audio("../../optionpress.mp3");
      optionpress.play()
      router.push({ name: this.next, params: { id: this.code } });
    },
    home: function () {
      router.push("/");
    },
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

.line {
  width: 32%;
  border: 4px solid #000000;
  margin: 8px;
  vertical-align: top;
}

.game-option {
  width: 100%;
  aspect-ratio: 10/1;
  height: auto;
  margin: 0px;
}

canvas {
  padding: 0px;
}

.nes-icon {
  transform: scale(1.1);
  margin: 2px;
}

.game-options {
  height: fit-content;
  /* padding: 16px 32px; */
}

.auto-layout {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 28px;
  width: 100%;
}

.auto-layout h4 {
  margin-bottom: 0;
}

.chat-box {
  height: 136px;
  width: calc(100% - 8px);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
  bottom: 0px;
  padding-right: 64px;
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
  height: 100vh;
}

.info {
  /* height: fit-content; */
  height: 20;
  width: fit-content;
}

</style>
