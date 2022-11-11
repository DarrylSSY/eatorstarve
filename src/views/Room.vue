<template>
  <body>
    <div class="container-sm">
      <br />
      <div class="row gx-4 room-body">
        <div class="col-12 text-center ">
          <h1>Welcome to Game Room</h1>
        </div>

        <div class="col-12 d-flex justify-content-center">
          <div class="nes-textarea text-center">
            <h2>{{code}}</h2>
          </div>
        </div>

        <div class="col-xs-1 col-sm-1 col-md-1 col-lg-2 px-0 py-0"></div>
        <div class="col-xs-10 col-sm-10 col-md-10 col-lg-8 px-0 py-0">
          <!-- username, avatar, home button and play buttons -->
          <div class="nes-container is-rounded is-centered">
            <div class="col-12">
              <!-- check username -->
              <input
                id="username"
                v-model="currentUsername"
                type="text"
                class="nes-input is-primary"
                placeholder="Enter a username"
                @input="checkUsername()"
              />
            </div>

            <!-- if username invalid, this will appear in red below username -->
            <!-- need fix change username after its been taken and directed  -->
            <div class="col-12 ">
              <div id="usernameError">
                <p class="text-danger" v-if="currentUsername==''">{{ error1 }}</p>
                <p class="text-danger" v-else-if="validUser == false && currentUsername != ''">{{ currentUsername }} has completed the game! View results or change username?</p>
                <p class="text-danger" v-else-if="regex.test(currentUsername) == false">Invalid username <br>(12 characters max and no special characters)</p>
              </div>

            </div>

            <div class="col-12 mb-2" v-if="regex.test(currentUsername) == true">
              <img :src="
                  'https://avatars.dicebear.com/api/pixel-art/' +
                  currentUsername +
                  '.svg'
                "
              />
            </div>

            <!--home button -->
            <div class="row">
              <div class="col-6">
                <button
                  type="button"
                  class="nes-btn is-primary d-flex align-items-center justify-content-center col-6"
                  @click="home"
                >
                  <font-awesome-icon
                    icon="fa-solid fa-arrow-left"
                    class="me-2"
                  />
                  Go Home
                </button>
              </div>

              <!-- start game button -->
              <div id="buttonNext" class="col-6">
                <button v-if="validUser == false && currentUsername!=''"
                type="button" class="nes-btn is-warning" @click="holding()">View Results!</button>

                <button v-else-if="currentUsername == '' || regex.test(currentUsername) == false"
                  type="button"
                  class="nes-btn is-disabled"
                  @click="play()"
                >
                  Start Game!
                </button>

                <button v-else
                  type="button"
                  class="nes-btn is-warning"
                  @click="play()"
                >
                  Start Game!
                </button>


              </div>
            </div>
          </div>
        </div>
        <div class="col-2"></div>

        <!-- copy link button -->
        <div id="link" class="row ">
          <div class="col-1"></div>
            <div class="col-8 text-center is-rounded">
              <input type="text" class="nes-input is-primary" :value="currentUrl" />
            </div>

            <div class="col-2 px-0 py-0">
                <button
                id="copy"
                  type="button"
                  class="nes-btn is-warning text-center"
                  @click="copy_link"
                >
                  Copy Link
                </button>
                <div v-show="copySuccess" class="nes-balloon from-left hideElement" data-bs-toggle="popover" data-bs-trigger="focus">
                  <p>Copied!</p>
                </div>
            </div>

          <RoomCheckerComponent :roomcode="code" />
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import router from "@/router";
import RoomCheckerComponent from "../components/RoomCheckerComponent";
import { useSessionStore } from "../stores/session";
import axios from "axios";

export default {

  name: "RoomView",
  components: {
    RoomCheckerComponent,
  },
  data() {
    return {
      code: this.$route.params.code,
      bgm: null,
      currentUrl: "",
      validUser: false,
      currentUsername: "",
      copySuccess: false,
      regex: new RegExp("^[A-Za-z0-9]{1,12}$"),
      error1: 'Please enter a username',
    };
  },

  created() {

    this.currentUrl = window.location.href;
  },
  methods: {
    play: function () {
      let buttonpress = new Audio("../../buttonpress.mp3");
      buttonpress.play();
      if (this.validUser == true) {
        const username = useSessionStore();
        username.setUsername(this.currentUsername);
        router.push({ name: "Instruction" });
      }

    },
    holding: function(){
      let buttonpress = new Audio("../../buttonpress.mp3");
      buttonpress.play();
      router.push({ name: "Holding" });
    },
    home: function () {
      let buttonpress = new Audio("../../buttonpress.mp3");
      buttonpress.play();
      router.push("/");
    },
    copy_link: async function () {
      this.copySuccess = true;
      try {
        let buttonpress = new Audio("../../buttonpress.mp3");
        buttonpress.play();
        await navigator.clipboard.writeText(window.location.href);
        setTimeout(() => this.copySuccess = false, 5000)
      }
      catch ($e) {
        alert("Error copying link to clipboard");
      }
    },

    checkUsername() {
      axios.get(`${process.env.VUE_APP_BACKEND_URL}api/user/${this.code}/${this.currentUsername}`).then(response => {
        if (response.data == false) {
          this.validUser = true;
        } else {
          this.validUser = false;
        }
      })
      if (this.currentUsername != "") {
        this.validUser = true;
      } else {
        this.validUser = false;
      }
    },
  },
};
</script>

<style scoped>
input {
  background: rgb(234, 234, 168);
  text-align: center;
  width: 100%;
  height: fit-content;
  color: black;
}

.nes-btn {
  width: 100%;
  min-width: fit-content;
  height: fit-content;
}

body {
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

.nes-container {
  height: fit-content;
  background-color: #ededed;
}

.room-body {
  height: 100%;
}

.container-sm {
  height: 100%;
}

#usernameError {
  color: red;
}

img {
  height: 200px;
  width: 100%;
}

.nes-balloon{
  position: absolute;
  bottom:-4px;
  right: 0px;
  z-index: 1;
}
.text-danger{
  font-size: 12px;
}
.nes-textarea{
  width: fit-content;
  height: fit-content;
  background-color: white;
}

#link.row{
  height: fit-content;
}

</style>
