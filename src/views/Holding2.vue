<template>
  
  <div class="whole">
    <!-- <button type="button" class="nes-btn is-primary" onclick="document.getElementById('dialog-rounded').showModal();">
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
    
    <h1 class="end">The End.</h1>
    <div class="main_component nes-container is-rounded">
      <p>Completed: </p>
      <div class="container">
        <div class="row">
          <!-- <div class="col"></div> -->
          <div class="user_list col">
            <ul>
              <li v-for="user in answered" v-bind:key="user" v-bind:user="user" >
                <img style="width: 50px" :src="get_avatar(user)">   {{ user }}
              </li>
            </ul>
          </div>
          <!-- <div class="col-2"></div> -->
        </div>
      </div>
    </div>

    <div class="text_component nes-container is-rounded">
      <div class="typewriter">
        <!-- Hi {{username}}, your yum craves has been recorded. -->
        Cravings recorded succesfully.
        Do you want to view results?
      </div>

      <div style="display: flex; justify-content: space-evenly; margin-top: 30px;">
        <label>
          <input type="radio" class="nes-radio" name="answer" checked />
          <span>Yes</span>
        </label>

        <label>
          <input type="radio" class="nes-radio" name="answer" />
          <span>No</span>
        </label>
      </div>
    </div>
    

  </div>
  <!-- <GenerateResultsComponent :code="code"/>
  <UsernameCheckerComponent /> -->
</template>



<script>
import router from "@/router";
import { useSessionStore } from '../stores/session';
import UsernameCheckerComponent from "../components/UsernameCheckerComponent";
import axios from "axios";
import GenerateResultsComponent from "@/components/GenerateResultsComponent";

export default {
  name: "HoldingView",
  components: {
    GenerateResultsComponent,
    UsernameCheckerComponent,
  },
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
      router.push({ name: 'Results', params: {id:this.code} })
    },
    get_avatar(user) {
      return "https://avatars.dicebear.com/api/pixel-art/" + user + ".svg"
    }
  },
}
</script>

<style scoped>

.whole {
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
}

.end {
  margin-top: 150px;
  margin-bottom: 50px;
  text-align: center;
}

div.main_component {
  margin-right: auto;
  margin-left: auto;
  margin-top: 20px;
  margin-bottom: 10px;
  width: 400px;
  height: 250px;
  /* position: sticky; This shit doesnt work */
  bottom: 0;
  background-color: rgb(247, 213, 29);
  margin-bottom: 20px;
  
}

div.text_component {
  margin-right: auto;
  margin-left: auto;
  margin-top: 20px;
  margin-bottom: 10px;
  width: 75%;
  height: 150px;
  /* position: sticky; This shit doesnt work */
  bottom: 0;
  /* background-color: rgb(247, 213, 29); */
  margin-bottom: 20px;
  text-align: left;
  
}

.user_list {
  overflow-y: auto;
  height: 180px;
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


/* typewriter , @keyframes typing and blink-caret can be removed to remove animation */
.typewriter {
  margin-bottom: 20px;
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: .15em solid orange; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: .15em; /* Adjust as needed */
  animation: 
    typing 3.5s steps(30, end),
    blink-caret .5s step-end infinite;
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

.nes-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

</style>