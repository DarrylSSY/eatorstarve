<template>
  <body>
  <dialog id="dialog-rounded" class="nes-dialog is-rounded">
    <form style="text-align:center;">
      <h4 >Are you Sure?</h4><br><br>
      <p>No other players will be allowed to join after results has been generated.</p>
      <menu class="dialog-menu p-0">
        <button type="button" class="nes-btn is-primary" @click="generate">Yes</button>
        <button type="button" class="nes-btn" @click="close" >No</button>
      </menu>
    </form>
  </dialog>

  <dialog id="exitModal" class="nes-dialog is-rounded dialog">
      <div style="text-align:center;">
          <h4>Wait!</h4>
          <p>Heading back to Home Page?<br><br>
          </p>
          <small>
              Note: You can come back to this page by rejoining this room! <br>
          </small>

          <br>
          <button type="button" class="nes-btn is-warning" style="margin-bottom:10px;" @click="home">Yes, Goodbye!</button>
          <a class="nes-btn" @click="close2" >Cancel</a>
      </div>
  </dialog>


  <div class="whole container container-sm">

    <!-- <div class="row">

      <div class="col-2">
        <button type="button" class="nes-btn is-error" onclick="document.getElementById('exitModal').showModal();">Exit</button>
      </div>

      <div class="col-8 col-content">
          <h4 class="logo">Eat or Starve</h4>
      </div>

      <div class="col-12">
        <div class="ending_container">
          <h2 class="end">The End.</h2>
        </div>

      </div>
    </div> -->

    <div class="row top gx-4">
      <div class="col-3 col-md-2 ps-0 col-content">
        <button type="button" class="nes-btn is-error" @click="exit">Exit</button>
      </div>

      <div class="col-6 col-md-8 col-content">
          <h1 class="logo">The End</h1>
      </div>

      <div class="user col-3 col-md-2 col-content nes-container">
          {{ username }}
      </div>
  </div>

    <!-- User List -->

    <div class="row component">
      <div class="col"></div>
      <div class="col-12 col-md-10 col-lg-10">
        <div class="main_component nes-container is-rounded">
          <h5> Completed: </h5>
          <div class="container">
            <div class="row">
              <!-- <div class="col"></div> -->
              <div class="user_list col">
                <ul>
                  <li v-for="user of answered.users" v-bind:key="user">
                    <img style="width: 40px; height: auto;" :src="get_avatar(user)">   {{ user }}
                  </li>
                </ul>
              </div>
              <!-- <div class="col-2"></div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="col"></div>
    </div>

      <div class="result">

        <!-- <div class="row ">
          <div class="col"></div>
          <div class="col-3 col-md-3 col-lg-3">
            <div :style="{'visibility': visible}" class="nes-container yesno">

                 <label>
                  <input v-model="value" type="radio" class="nes-radio" name="answer" value="yes" @keydown.enter="enter()" checked />
                  <span>Yes</span>
                </label>


                <label>
                  <input v-model="value" type="radio" class="nes-radio" name="answer" value="no" @keydown.enter="enter()" />
                  <span>No</span>
                </label>
                <YesNoRadio @yesFunction="yesoption()" @noFunction="nooption()"  />
            </div>
          </div>
        </div> -->

        <!-- Generate Result Dialog -->

        <div class="row">

          <div class="col-12">
          <div class="text_component container nes-container is-rounded">

            <div class="row py-sm-4">
              <div class="col-12">
                <div class="text_container">
                  <div class="typewriter">
                    Do you want to generate results?
                  </div>
                  <div class="hider">
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                  </div>
                </div>
              </div>

              <!-- <div class="col"></div> -->
              <div class="col-12">
                <div>
                  <button type="button" class="nes-btn is-warning" @click="enter()" >Generate</button>
                </div>

                <!-- <div class="enter d-none d-sm-block">
                  Press 'Enter' to continue
                </div> -->

              </div>
          </div>


          </div>
        </div>
      </div>
  </div>


  </div>
  <!-- <GenerateResultsComponent :code="code"/>
  <UsernameCheckerComponent /> -->
</body>



</template>



<script>
import router from "@/router";
import { useSessionStore } from '../stores/session';
// import UsernameCheckerComponent from "../components/UsernameCheckerComponent";
import axios from "axios";
// import GenerateResultsComponent from "@/components/GenerateResultsComponent";
// import YesNoRadio  from '../components/YesNoRadio.vue';
import {reactive} from 'vue';
export default {
  name: "HoldingView",
  // components: {
  //   GenerateResultsComponent,
  //   UsernameCheckerComponent,
  // },
  setup() {
    const store = useSessionStore()
    return {
      username: store.getUsername
    }
  },
  data() {
    return {
      code: this.$route.params.code,
      answered: reactive({users: []}),
      value: "",
      visible: "hidden",


    }
  },

  created() {
    setTimeout(() => this.visible =  ``, 2500)
  },

  mounted() {
    axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}`).then(response => {
      this.answered.users = response.data

    })
    setInterval(function() {
      axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}`).then(response => {
        this.answered.users = response.data
      })}.bind(this),3000);

  },

  // components: { YesNoRadio },

  methods: {
    home: function () {
      let buttonpress = new Audio("../../buttonpress.mp3");
      buttonpress.play();
      router.push("/");
    },
    next: function (){
      router.push({ name: 'Results', params: {id:this.code} })
    },
    get_avatar(user) {
      return "https://avatars.dicebear.com/api/pixel-art/" + user + ".svg"
    },
    enter() {
        let buttonpress = new Audio("../../buttonpress.mp3");
        buttonpress.play();
      // router.push({ name: 'Result', params: {id:this.code} })
      document.getElementById('dialog-rounded').showModal();

    },
    close() {
      let buttonpress = new Audio("../../buttonpress.mp3");
        buttonpress.play();
      document.getElementById('dialog-rounded').close().preventDefault()
    },
    close2() {
      let buttonpress = new Audio("../../buttonpress.mp3");
        buttonpress.play();
        document.getElementById('exitModal').close()
    },
    exit() {
      let buttonpress = new Audio("../../buttonpress.mp3");
        buttonpress.play();
        document.getElementById('exitModal').showModal();
    },
    generate() {
      let buttonpress = new Audio("../../buttonpress.mp3");
        buttonpress.play();
      router.push({ name: 'Result', params: {id:this.code} })
    }


  }


}
</script>

<style scoped>

div.nes-container {
    background-color: white;
}

.top {
    padding-top: 24px;
}

.col-content {
    height: 70px;
}

button.is-error {
    width: 100%;
    height: 62.4px;
}

.logo {
    /* padding: 17.8px 0px; */
    text-align: center;
    margin: 0;
    padding-top: 10px;
    /* font-size: 3.2vw ; */

}

.user {
    padding: 20px;
    text-align: center;
}

.component {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 250px;
  top: 200px;
}

.whole {
  text-align: center;
  position: relative;
  margin: auto;
  width: 100%;
  height: 100%;

}

@keyframes typing {
    from { width: 100% }
    to { width: 0 }
}

.ending_container {
  position: relative;
  margin-top: 50px;
  margin-bottom: 10px;
  text-align: center;
  width: 100%;
}

.end {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0;
  z-index: 0;
}

div.main_component {
  padding-top: 10px;
  margin-right: auto;
  margin-left: auto;
  /* margin-top: 100px; */
  /* margin-bottom: 10px; */
  width: 55%;
  height: 100%;
  background-color: rgb(247, 213, 29);
  min-height: 250px;
  min-width: 300px;

}

.user_list {
  /* overflow-y: auto;
  height: 180px;
  overflow-y: scroll;
  text-align: left; */

  overflow-y: auto;
  position: absolute;
  bottom: 20px;
  top: 70px;
  /* height: 50%; */
  overflow-y: ;
  text-align: left;
  right: 15px;
}

div.text_component {
  /* position: absolute;
  bottom: 0px; */
  margin-right: auto;
  margin-left: auto;
  margin-top: 20px;
  /* margin-bottom: 10px; */
  width: 100%;
  height: auto;
  /* position: sticky; This shit doesnt work */
  /* background-color: rgb(247, 213, 29); */
  /* margin-bottom: 20px; */
  text-align: left;
  background-color: white;
  padding-top: 0px;
  padding-bottom: 0px;
}

.result {
  position: absolute;
  bottom: 20px;
  left: 10px;
  right: 10px;
}

.text_container {
  position: relative;
}

.typewriter {
  padding-top: ;
  position: absolute;
  /* font-size:large; */
  top: 0;
  margin: 0;
  z-index: 0;
}

.hider {
  margin: 0;
  top: 0;
  width: 100%;
}

.hider p {
  position: relative;
  clear: both;
  margin: 0;
  float: right; /* makes animation go left-to-right */
  width:0; /* graceful degradation: if animation doesn't work, these are invisible by default */
  /* height: 15px; */
  background: white; /* same as page background */
  animation: typing 1s steps(30, end);
  animation-delay: 1s;
  animation-fill-mode:both;  /* load first keyframe on page load, leave on last frame at end */
}

.hider p:nth-child(2) {
  animation-delay: 4s;
}
.hider p:nth-child(3) {
  animation-delay: 8s;
}



li {
  list-style-type: none;
  text-align: left;
  margin: 10px;

}

img {
  margin-right: 20px;
}

/* button {
  margin-left: 20px;
  margin-right: 20px;
} */

/* .nes-btn {

  right: 20px;
} */

.enter {
  text-align: right;
  color: grey;
}

/* .row{
  height: 100px;
} */

.yesno {
  padding-left: 30%;
  text-align: left;
  margin-top: 0px;
  height: auto;
  background-color: white;
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

.typewriter button {
  width: 100px;;
}

</style>
