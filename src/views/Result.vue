<template>
  <dialog id="exitModal" class="nes-dialog is-rounded dialog p-2 p-sm-4">
    <div>
      <h4>Wait!</h4>
      <p>Heading back to Home Page?<br /><br /></p>
      <small>
        Note: You can check this results again by rejoining this room! <br />
      </small>

      <br />
      <button
        class="nes-btn is-warning"
        style="margin-bottom: 10px"
        type="button"
        @click="home"
      >
        Yes, Goodbye!
      </button>
      <button class="nes-btn" @click="closeModal">Cancel</button>
    </div>
  </dialog>

  <body>
    <div class="container-sm p-0">
      <!-- Top Bar -->
      <div class="row mx-0">
        <div class="col-3 col-md-2 mt-2 px-0">
          <button class="nes-btn is-error" type="button" @click="openModal">
            Quit
          </button>
        </div>

        <div class="col-6 col-md-8 mt-2 px-2">
          <h1 class="logo">Eat or Starve</h1>
        </div>

        <div class="code col-3 col-md-2 mt-2 px-0 mb-2 nes-container">
          <p>
            {{ code }}
          </p>
        </div>
      </div>
    </div>

    <!-- Result Gallery -->
    <div class="gallery">
      <div
        id="suggestions"
        class="carousel slide"
        data-bs-ride="carousel"
        data-bs-touch="true"
      >
        <div class="carousel-inner nes-container px-1 py-2 p-sm-3">
          <GenerateResultsComponent
            :code="code"
            @get-choices="getChoices"
          ></GenerateResultsComponent>
        </div>
        <div class="arrow-buttons">
          <button
            class="carousel-control-prev"
            data-bs-slide="prev"
            data-bs-target="#suggestions"
            type="button"
            @click="playSound"
          >
            <span aria-hidden="true" class="carousel-control-prev-icon"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            data-bs-slide="next"
            data-bs-target="#suggestions"
            type="button"
            @click="playSound"
          >
            <span aria-hidden="true" class="carousel-control-next-icon"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <!-- copylink -->
      <div id="link" class="row justify-content-center gy-1">
        <div class="col-8 col-md-7 col-lg-7 text-center is-rounded ps-0">
          <input
            :value="currentUrl"
            class="nes-input is-primary text-center"
            style="width: calc(100% + 16px)"
            type="text"
          />
        </div>
        <div class="col-8 col-md-3 col-lg-3 p-0 py-0">
          <button
            id="copy"
            class="nes-btn is-warning text-center"
            type="button"
            @click="copy_link"
          >
            Copy Link
          </button>
          <div
            v-show="copySuccess"
            class="nes-balloon from-left"
            data-bs-toggle="popover"
            data-bs-trigger="focus"
          >
            <p>Copied!</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container p-0" style="margin: auto">
      <DialogueBox :message="joke_list[rand_num]"></DialogueBox>
    </div>
  </body>
</template>

<script>
import DialogueBox from "@/components/DialogueBox.vue";
import GenerateResultsComponent from "@/components/GenerateResultsComponent.vue";
import { useSessionStore } from "../stores/session";
// import axios from "axios";
import router from "@/router";

export default {
  name: "ResultView",
  components: { GenerateResultsComponent, DialogueBox },
  setup() {
    const store = useSessionStore();
    return {
      username: store.getUsername,
      currentUrl: "",
    };
  },
  data() {
    return {
      code: this.$route.params.code,
      choices: "Test",
      received_keywords: "",
      copySuccess: false,
      joke_list: [
        "What’s the best way to burn vegetables?\n Roast them.",
        "Which condiment adds the most kick?\n Horseradish.",
        "Why are butchers so hilarious?\n They always ham it up.",
        "What’s the best food when you’re so hungry you could eat a house?\n Cottage cheese, wall nuts, and kitchen sink cookies.",
        "Why are chefs so harsh?\n They’re always beating eggs.",
        "What’s the most desirable kitchen appliance?\n A “hot” plate.",
        "Which friends should you always take out to dinner?\n Your taste buds.",
        "How do you make a recipe pop with ginger?\n Play “Spice Girls” songs while you cook.",
        "What’s the best food to eat before a workout?\n Mussels.",
        "What part of a meal makes you the most sleepy?\n The nap-kin.",
        "What’s the main ingredient in canned laughter?\n Processed cheese.",
        "When is eating just like school?\n When you have three or four courses.",
        "What’s the most relaxing type of pasta?<\n Spa-ghetti.",
      ],
      rand_num: 0,
    };
  },

  created() {
    this.currentUrl = window.location.href;
  },

  beforeMount() {
    this.rand_num = Math.floor(Math.random() * this.joke_list.length);
  },


  methods: {
    home: function () {
      let buttonpress = new Audio("../../buttonpress.mp3");
      buttonpress.play();
      router.push("/");
    },
    openModal: function () {
      document.getElementById("exitModal").showModal();
      let buttonpress = new Audio("../../buttonpress.mp3");
      buttonpress.play();
    },
    closeModal: function () {
      document.getElementById("exitModal").close();
      let buttonpress = new Audio("../../buttonpress.mp3");
      buttonpress.play();
    },
    playSound() {
      let buttonpress = new Audio("../../buttonpress.mp3");
      buttonpress.play();
    },
    copy_link: async function () {
      this.copySuccess = true;
      try {
        let buttonpress = new Audio("../../buttonpress.mp3");
        buttonpress.play();
        await navigator.clipboard.writeText(window.location.href);
        setTimeout(() => (this.copySuccess = false), 5000);
      } catch ($e) {
        console.log($e);
      }
    },
  },
};
</script>

<style scoped>
div.nes-container {
  background-color: white;
}

.nes-btn {
  width: calc(100% - 8px);
  height: 56px;
}


.logo {
  text-align: center;
  margin: 0;
  padding-top: 10px;
}



body {
  width: 100%;
  height: 100%;
  background: linear-gradient(
      0deg,
      rgba(245, 200, 95, 0.66),
      rgba(245, 200, 95, 0.66)
    ),
    url(../assets/bg1.jpeg);
  display: block;
  overflow: auto;
}

.carousel-inner {
  margin: auto;
  height: 60vh;
  min-height: 100%;
}

.gallery {
  margin: auto;
  padding-top: 20px;
  padding-bottom: 140px;
  width: 75%;
}


.arrow-buttons {
  width: 80%;
  top: 20%;
}


.carousel-control-prev,
.carousel-control-next {
  margin: auto 4px;
  background-color: #f7d51d;
  height: 15%;
  width: 6%;
}

.dialog {
  width: fit-content;
}

small {
  text-align: left;
}


#link {
  margin-top: 10px;
  width: 100%;
}

#copy {
  height: 85%;
}

.code {
  padding: 20px;
  text-align: center;
  height: 70px;
}

.nes-balloon {
  position: absolute;
  bottom: 150px;
  right: 0px;
  z-index: 1;
}

@media screen and (max-width: 575px) {
  .gallery {
    margin: 0;
    width: 100%;
  }
}
</style>
