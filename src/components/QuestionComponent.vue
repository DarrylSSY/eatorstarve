<template>
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
    <!-- <div class="col-12"></div> -->
    <div class="col-4 col-md-2 ps-0 mt-3">
      <button
        type="button"
        class="nes-btn is-error"
        onclick="document.getElementById('dialog-rounded').showModal();"
      >
        Quit
      </button>
    </div>
    <div class="col-8 col-md-10 pe-0 mt-3">
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
        <h4>{{ answer1 }}</h4>
      </button>
      <div class="auto-layout">

        <p>-- OR --</p>

      </div>
      <button
        type="button"
        class="game-option nes-btn"
        :class="btn_state_2"
        @click="option2"
      >
        <h4>{{ answer2 }}</h4>
      </button>
    </div>
    <!-- Question number, health bar and username -->
    <div class="row px-0 mx-0 bar">
      <div class="info col-5 col-md-2 ps-0 py-0">
        <!-- Username -->
        <div class="nes-container is-centered is-rounded">
          {{ username }}
        </div>
      </div>
      <div class="info col-5 col-md-5 ps-0">
        <div class="nes-container is-rounded heart">
          <canvas id="canvas" height="20"></canvas>
        </div>
      </div>
    </div>

    <!-- <div class="chat-box nes-container is-centered is-rounded col-12 my-0">
      <img
        class="profile"
        v-bind:src="
          'https://avatars.dicebear.com/api/pixel-art/' + username + '.svg'
        "
      />
      <h3>{{ question }} {{ category }}!</h3>
    </div> -->
    <div class="col-12 px-0">
      <DialogueBox :question="question" :category="category" type='user'/>  
    </div>
  </div>
</template>

<script>
import { useSessionStore } from "../stores/session";
import axios from "axios";
import router from "@/router";
import { Rive, Layout } from "@rive-app/canvas";
import DialogueBox from "./DialogueBox.vue";
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
            btn_state_1: "is-disabled",
            btn_state_2: "is-disabled",
            question: "Choose your ",
            next: "Question2",
            progress: 0,
            color: "",
            timer: null,
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
        }
        else if (this.category == "poultry") {
            this.next = "Question3";
            this.progress = 10;
            this.color = "is-error";
        }
        else if (this.category == "price") {
            this.next = "Question4";
            this.progress = 25;
            this.color = "is-error";
        }
        else if (this.category == "texture") {
            this.next = "Question5";
            this.progress = 40;
            this.color = "is-warning";
        }
        else if (this.category == "base") {
            this.next = "Question6";
            this.progress = 55;
            this.color = "is-warning";
        }
        else if (this.category == "spice") {
            this.next = "Question7";
            this.progress = 75;
            this.color = "is-success";
        }
        else {
            this.next = "Holding";
            this.progress = 90;
            this.color = "is-success";
        }
        function generate2RandomNumber(x) {
            let num1 = Math.floor(Math.random() * x);
            let num2 = Math.floor(Math.random() * x);
            if (num1 == num2) {
                if (num2 > 0) {
                    num2 = num2 - 1;
                }
                else if (num2 < x) {
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
            optionpress.play();
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
            optionpress.play();
            router.push({ name: this.next, params: { id: this.code } });
        },
        home: function () {
            router.push("/");
        },
    },
    components: { DialogueBox }
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

/* .auto-layout h4 {
  margin-bottom: 0;
} */

.auto-layout p {
  font-size: 20pt;
  margin-bottom: 0;
}

h4 {
  margin: 0;
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
  height: 100vh;
}

.info {
  height: fit-content;
}

.heart {
  width: 300px;
  /* margin: 0; */
  padding-left: 0px;
}

.bar {
  padding-top: 10px;
  height: 60px;
}

.bar .nes-container {
  height: 100%;
  padding: 10px 0px;
}
</style>
