<template>
    <!-- <button type="button" class="nes-btn is-primary" onclick="document.getElementById('dialog-rounded').showModal();">
  <div class="container-sm">
      Home
    </button>
    <dialog class="nes-dialog is-rounded" id="dialog-rounded">
      <form method="dialog">
        <p class="title">Are you sure you want to exit?</p>
        <p>Your progress will not be saved.</p>
        <menu class="dialog-menu">
          <button class="nes-btn">Cancel</button>
          <button class="nes-btn is-primary" @click="home">Confirm</button>
        </menu>
      </form>
    </dialog>
    <button type="button" class="nes-btn is-primary" @click="next">Next</button> -->
    <div class="typewriter">
      Hi {{username}}, your yum craves has been recorded
    </div>
    <div class="nes-container is-rounded">
      <p>There are {{answered.length - 1}} other yummers that are hungry and waiting... </p>
      <div class="container">
        <div class="row">
          <div class="col"></div>
          <div class="user_list col-9">
            <ul>
              <li v-for="user in answered" v-bind:key="user" v-bind:user="user" >
                <img style="width: 50px" :src="get_avatar(user)">   {{ user }}
              </li>
            </ul>
          </div>
          <div class="col-2"></div>
        </div>
      </div>
    </div>
  <!-- <GenerateResultsComponent :code="code"/> -->
  
</template>



<script>
import router from "@/router";
import { useSessionStore } from '../stores/session';
// import UsernameCheckerComponent from "../components/UsernameCheckerComponent";
import axios from "axios";
// import GenerateResultsComponent from "@/components/GenerateResultsComponent";

export default {
  name: "HoldingView",
  // },
  //   GenerateResultsComponent,
  // components: {
  setup() {
    const store = useSessionStore()
    return {
      username: store.getUsername
    }
  },
  data() {
    return {
      code: this.$route.params.code,
      answered: []


    }
  },
  mounted() {
    axios.get('http://localhost:8081/api/room/' + this.code).then(response => {
      this.answered = response.data
    })
  },
  methods: {
    next: function (){
      // let buttonpress = new Audio("../../buttonpress.mp3");
      // buttonpress.play()
      router.push({ name: 'Results', params: {id:this.code} })
    },
    get_avatar(user) {
      return "https://avatars.dicebear.com/api/pixel-art/" + user + ".svg"
    }
  },
}
</script>

<style scoped>

div.nes-container {
  margin-right: auto;
  margin-left: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 800px;
  height: 400px;
  position: sticky; /* This shit doesnt work */
  bottom: 0;
  background-color: rgb(247, 213, 29);
  margin-bottom: 20px;
  
}

.user_list {
  overflow-y: auto;
  height: 300px;
  overflow-y: scroll;
}

/* div.nes-container.scroll { */
  /* margin-right: auto;
  margin-left: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 700px;
  position: sticky; 
  bottom: 0; */
  
/* } */

user_list {
  text-align: left;
}

/* .heading {
  font-size: large;
  margin-top: 50px;
  margin-bottom: 30px;
  margin-bottom: 100px;
} */

.typewriter {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: .15em solid orange; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: .15em; /* Adjust as needed */
  animation: 
    typing 3.5s steps(40, end),
    blink-caret .75s step-end infinite;
}


/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange; }
}


li {
  list-style-type: none;
  text-align: left;
  margin: 10px;
}

img {
  margin-right: 20px;
}

button {
  margin-left: 20px;
  margin-right: 20px;
}

</style>