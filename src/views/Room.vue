<template>
  <body>
    <div class="container-sm">
      <br />
      <div class="row gx-4 room-body">
        <div class="col-12 text-center">
          <h1>Welcome to Game Room</h1>
        </div>

        <div class="col-12 text-center">
          <h2>{{ code }}</h2>
        </div>

        <div class="col-2"></div>
        <div class="col-8">
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
            <div class="col-12 my-3">
              <p
                v-show="validUser == false && currentUsername != ''"
                id="usernameError"
              >
                Username already exists.
              </p>
            </div>

            <div class="col-12">
              <img
                :src="
                  'https://avatars.dicebear.com/api/pixel-art/' +
                  currentUsername +
                  '.svg'
                "
              />
            </div>

            <!--home and start game button -->
            <div class="row mt-3">
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
              <div class="col-6">
                <button
                  type="button"
                  class="nes-btn is-warning col-6"
                  @click="play"
                >
                  Start Game!
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-2"></div>

        <!-- copy link button -->
        <div class="col-1"></div>
        <div class="col-8 text-center is-rounded">
          <input type="text" class="nes-input is-primary" :value="currentUrl" />
        </div>
        <div class="col-2">
          <button
            type="button"
            class="nes-btn is-warning d-flex justify-content-center"
            @click="copy_link"
          >
            Copy Link
          </button>

          <section>
            <button
              type="button"
              class="nes-btn is-warning"
              onclick="document.getElementById('dialog-rounded').showModal();"
            >
              Copy Link
            </button>

            
            <dialog id="dialog-rounded" class="nes-dialog is-rounded" >
              <form method="dialog">
                <p class="title">Link copied to clipboard!</p>
                <menu class="dialog-menu">
                  <button class="nes-btn is-primary">ok</button>
                </menu>
              </form>
            </dialog>
          </section>

          <div id="popup"></div>
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

      // username function need use
      validUser: false,
      currentUsername: "",
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
      router.push({ name: "Starting", props: true });
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
      } catch ($e) {
        alert("Error copying link to clipboard");
      }
    },
    //not finished code to check username validity
    //check if username repeated in same room from database
    //username valid-> validUser=true -> can play game
    checkUsername() {
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
}

body {
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
</style>
