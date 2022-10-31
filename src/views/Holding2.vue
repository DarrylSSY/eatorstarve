<template>
  
  <div class="whole container">   

    <div class="row">
      <div class="col-12">
        <h1 class="end">The End.</h1>
      </div>
    </div> 


    <div class="row">
      <div class="col"></div>
      <div class="col-12 col-md-10 col-lg-10">
        <div class="main_component nes-container is-rounded">
          <p> Completed: </p>
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
      </div>
      <div class="col"></div>
    </div>

    <div class="row mt-5">
      <div class="col"></div>
          <div class="col-5 col-md-4 col-lg-2">
            <div class="nes-container yesno">
              <div class="row">
                <label>
                  <input v-model="value" type="radio" class="nes-radio" name="answer" value="yes" @keydown.enter="enter()" checked />
                  <span>Yes</span>
                </label>
              </div>

              <div class="row">
                <label>
                  <input v-model="value" type="radio" class="nes-radio" name="answer" value="no" @keydown.enter="enter()" />
                  <span>No</span>
                </label>
              </div>
            </div>
          </div>
        </div>

    <div class="row">
      <div class="col-12">
      <div class="text_component container nes-container is-rounded">
        
        <div class="row py-sm-4">
          <div class="col-8 col-md-12 col-lg-12">
            <div class="typewriter">
              Do you want to view results?
            </div>
          </div>
        
          <!-- <div class="col"></div> -->
          <div class="col mt-md-5 mt-lg-5">
            <div class="d-sm-none">
              <button type="button" class="nes-btn is-warning" @click="enter()" >Enter</button>
            </div>
            
            <div class="enter d-none d-sm-block">
              Press 'Enter' to continue
            </div>
            
          </div>
      </div>
          
        

      </div>
    </div>
  </div>
    

  </div>
  <!-- <GenerateResultsComponent :code="code"/>
  <UsernameCheckerComponent /> -->
</template>



<script>
import router from "@/router";
import { useSessionStore } from '../stores/session';
// import UsernameCheckerComponent from "../components/UsernameCheckerComponent";
import axios from "axios";
// import GenerateResultsComponent from "@/components/GenerateResultsComponent";

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
      answered: [],
      value: ""


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
    }, 
    enter() {
    alert(this.value)
    }
  },
}
</script>

<style scoped>

.whole {
  text-align: center;
  position: relative;
  margin: auto;
  
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
  width: 60%;
  height: auto;
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
  width: 100%;
  height: auto;
  /* position: sticky; This shit doesnt work */
  /* background-color: rgb(247, 213, 29); */
  margin-bottom: 20px;
  text-align: left;
  
  
}

.user_list {
  overflow-y: auto;
  height: 180px;
  overflow-y: scroll;
  text-align: left;
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

/* .heading {
  font-size: large;
  margin-top: 50px;
  margin-bottom: 30px;
  margin-bottom: 100px;
} */


/* typewriter , @keyframes typing and blink-caret can be removed to remove animation */


.typewriter {
  display: flex;
  align-items: center;
  font-size:larger;
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

.nes-btn {
  position: absolute;
  right: 20px;
}

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
}

</style>