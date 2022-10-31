<template>
  <body>
    <div class="container-sm">
      <br />
      <div class="row">
        <div class="col text-center">
          <h1>Welcome to Game Room</h1>
          <br />
          <h2>{{ code }}</h2>
        </div>
      </div>

      <div class="row gx-4">
        <div class="col-12 col-md-12 col-lg-12">
          <!-- username, avatar, home button and play buttons -->
          <div class="nes-container is-rounded is-centered my-5 mx-auto">
            <div class="row align-items-center mb-3">
              <div class="col input-group align-middle">
                
                <!-- check username -->
                <input
                  id="username"
                  v-model="currentUsername"
                  type="text"
                  class="nes-input is-primary form-control me-3"
                  placeholder="Enter a username"
                  @input="checkUsername()"
                />

                <!-- if username valid -->
                <div class="input-group-append">
                  <button
                    v-if="validUser"
                    style="width: auto; height: auto"
                    type="button"
                    class="nes-btn is-success"
                    @click="showAvatar()"
                  >
                    Confirm
                  </button>

                  <!-- if username invalid -->
                  <button
                    v-else
                    style="width: auto; height: auto"
                    type="button"
                    class="nes-btn is-disabled"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
            
            <!-- if username invalid -->
            <div class="row">
              <p v-show="validUser == false && currentUsername !='' " id="usernameError">
                Username already exists.
              </p>
            </div>

            <div class="row">
              <div class="col my-3">
                <img
                  v-show="avatar"
                  style="width: 100px"
                  v-bind:src="'https://avatars.dicebear.com/api/pixel-art/' + currentUsername + '.svg'"
                />
              </div>
            </div>

            <!--home and start game button -->
            <div class="row">
              <div class="col mx-auto">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                <button type="button" class="nes-btn is-primary" @click="home">
                  Go Home
                </button>
              </div>
              <div class="col mx-auto">
                <button type="button" class="nes-btn is-warning" @click="play">
                  Start Game!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- copy link button -->
      <div class="row mx-auto">
        <div class="col-8 text-center is-rounded mx-auto">
          {{ currentUrl }}
        </div>
        <div class="col-4">
          <button type="button" class="nes-btn is-warning" @click="copy_link">
            Copy Link
          </button>
          <RoomCheckerComponent :roomcode="code"/>
        </div>
      </div>
      
    </div>
  </body>
    
</template>

<script>
import router from "@/router";
import RoomCheckerComponent from "../components/RoomCheckerComponent";
import { useSessionStore } from "../stores/session";

export default {
  name: "RoomView",
  components: {
    RoomCheckerComponent
  },
  data() {
    return {
      code: this.$route.params.code,
      bgm: null,
      currentUrl: "",

      // username function need use
      validUser: false,
      currentUsername: "",

      //to show avatar
      avatar: false,
    };
  },

  created() {
    this.currentUrl = window.location.href;
  },
  methods: {
    play: function () {
      let buttonpress = new Audio("../../buttonpress.mp3");
      buttonpress.play();
      const username = useSessionStore();
      username.setUsername(this.currentUsername);
      router.push({ name: "Question1", props: true });
    },
    home: function () {
      let buttonpress = new Audio("../../buttonpress.mp3");
      buttonpress.play();
      router.push("/");
    },
    copy_link: async function () {
      try {
        let buttonpress = new Audio("../../buttonpress.mp3");
        buttonpress.play();
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard");
      } catch ($e) {
        alert("Error copying link to clipboard");
      }
    },
    //not finished code to check username validity
    //username valid-> validUser=true -> show cfm btn -> once click -> show avatar
    checkUsername() {
      if (this.currentUsername != "") {
        this.validUser = true;
      } else {
        this.validUser = false;
      }
    },
    showAvatar() {
      this.avatar = true;
    },
  },
};
</script>

<style scoped>
input {
  background: rgb(234, 234, 168);
  text-align: center;

  color: black;
}

/* button {
  width: 100%;
  height: 100%;
  bg color not working
  background-color: #f5c85f;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
} */


body {
  width: 100%;
  height: 100%;
  background: linear-gradient(
      0deg,
      rgba(245, 200, 95, 0.66),
      rgba(245, 200, 95, 0.66)
    ),
    url(../assets/bg1.jpeg);
  box-shadow: 7px 12px 18px rgba(0, 0, 0, 0.25);
}

.nes-container {
  width: 100%;
  background-color: #ededed;
}
#usernameError {
  color: red;
  font-size: 80%;
}
</style>
