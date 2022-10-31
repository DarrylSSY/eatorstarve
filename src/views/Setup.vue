<template>

  <body>
    <div class="container-sm">
      <br />
      <div class="row">
        <div class="col text-center">
          <h1>Pre-Game Setup</h1>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-12 col-lg-8 mx-auto">
          <div class="nes-container is-rounded is-centered my-5 mx-auto">

            <!-- date and time input -->
            <div id="day" class="row mb-3 mx-auto">
              <Datepicker 
              v-model="date" class="nes-input is-primary dp__theme_dark" placeholder="Date & Time"
              :min-date="new Date()" :is24="false">
              </Datepicker>
            </div>

            <!-- dietary needs options -->
            <div class="row mx-auto mb-3">Special Dietary Needs:</div>

            <div id="options" class="row text-start mb-3 mx-auto">
              <div v-for="option of options" :key="option.id">
                <label><input v-model="dietaryNeeds" type="checkbox" class="nes-checkbox" :value="option" /><span>{{
                    option
                }}</span></label>
              </div>

              <div class="col">
                <label><input v-model="checked" type="checkbox" class="nes-checkbox col" />
                  <span>Others:
                    <input 
                    v-show="checked" v-model="extra" type="text" class="nes-input is-primary col mt-3" placeholder="Other requirements" /> 
                  </span>
                </label>
              </div>
            </div>

            <!-- submit button -->
            <div v-show="date" class="row mx-auto">
              <button type="button" class="nes-btn is-warning" @click="create">
                Submit & Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import { ref } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import router from "@/router";
import axios from "axios";
export default {
  name: "SetupView",
  components: { Datepicker },
  setup() {
    const today = ref(new Date());

    return {
      today,
    };
  },

  data() {
    return {
      date: null,
      time: "",
      options: ["Halal-certified", "Vegan", "Vegetarian", "Gluten-free"],
      dietaryNeeds: [],
      extra: "",
      checked: null,
    };
  },
  methods: {
    create: function () {
      let buttonpress = new Audio("../../buttonpress.mp3");
      buttonpress.play()
      //get all dietary needs here
      if (this.extra != "") {
        let other = this.extra.split(",");
        for (let i = 0; i < other.length; i++) {
          this.dietaryNeeds.push(other[i]);
        }
      }
      // Incomplete code
      // Generate random code
      let generated_code = Math.random().toString(36).slice(9);
      // Check if room exists

      let error = false;
      // Keep generating until room doesn't exist
      while (error) {
        generated_code = Math.random().toString(36).slice(9);
        error = false;
      }
      // Else create room
      axios.post("http://localhost:8081/api/createdroom", {
        code: generated_code,
        status: "open"
      }).then((response) => {
        console.log(response);
        router.push("room/" + generated_code);
      }).catch((error) => {
        console.log(error);
      });

    },
  },
};
</script>

<style scoped>
#day {
  background: rgb(234, 234, 168);
  color: grey;
}

.dp__theme_dark {
  --dp-background-color: rgb(234, 234, 168);
  --dp-text-color: grey;
  --dp-border-color: none;
}

input {
  background: rgb(234, 234, 168);
  color: grey;
}

button {
  width: 100%;
  height: 100%;
  /* bg color not working */
}

h1 {
  font-size: 60px;
}

body {
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg,
      rgba(245, 200, 95, 0.66),
      rgba(245, 200, 95, 0.66)),
    url(../assets/bg1.jpeg);
}

.nes-container {
  background-color: #ededed;
}

#options {
  font-size: 80%;
}
</style>
