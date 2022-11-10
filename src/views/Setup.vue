<template>

  <body>
    <div class="container-sm">
      <div class="row">
        <div class="col-12 gy-4 text-center sm-gy-2 md-gy-3">
          <h1 class="text-center">Pre-Game Setup</h1>
        </div>
        <div class="col-10 col-md-8 offset-1 offset-md-2 gy-4">
          <div class="nes-container is-rounded is-centered">

            <!-- date input -->
            <div class="row">
              <div class="col-12 text-start mb-2">
                Select date:
              </div>
            </div>
            <v-date-picker v-model="date">
              <template v-slot="{ inputValue, inputEvents }">
                <div class="input-group">
                  <input type="text" class="nes-input form-control" :placeholder="date" :value="inputValue"
                    v-on="inputEvents">
                  <span class="input-group-text border-0 sm-px-1 "><button type="button" class="nes-btn is-error"
                      :disabled="!date" @click="date = new Date()">Clear</button></span>
                </div>
              </template>
            </v-date-picker>

            <!-- time input -->
            <div class="row mt-3">
              <div class="col-lg-6 col-xl-6 col-md-12 col-sm-12 col-xs-12 text-start">
                Select time:
                  <v-date-picker id="timePicker" mode="time" v-model="date" :timezone="timezone"
                  class="text-center border-0 bg-white col-lg-6 col-xl-6 col-md-12 col-sm-12 mt-2" />

              </div>

              <!-- location input -->
              <div class="col-lg-6 col-xl-6 col-md-12 col-sm-12 col-xs-12 mt-md-3 mt-sm-3 mt-xs-3 mt-lg-0 mt-xl-0 text-start ">
                Location:
                <div class="nes-select mt-2">
                  <select required id="location">
                    <option value="" disabled selected hidden>Select...</option>
                    <option value="default">Use my current location</option>
                    <option value="north">North</option>
                    <option value="south">South</option>
                    <option value="central">Central</option>
                    <option value="east">East</option>
                    <option value="west">West</option>
                  </select>
                </div>
              </div>

            </div>

            <!-- dietary needs options -->
            <div class="col-12 d-flex align-content-start mt-3 mb-2">Special Dietary Needs:</div>

            <div id="options" class="row text-start mb-3 mx-auto">
              <div v-for="option of options" :key="option.id">
                <label><input v-model="dietaryNeeds" type="checkbox" class="nes-checkbox" :value="option" /><span>{{
                    option
                }}</span></label>
              </div>

              <div class="col">
                <label><input v-model="checked" type="checkbox" class="nes-checkbox col" />
                  <span>Others:
                    <input v-show="checked" v-model="extra" type="text" class="nes-input is-primary col mt-3"
                      placeholder="Other requirements" />
                  </span>
                </label>
              </div>
            </div>
            <!-- submit button -->
            <div class="col">
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
import router from "@/router";
import axios from "axios";

export default {
  name: "SetupView",

  data() {
    return {
      date: new Date(), // date of meetup will update accordingly even if press clear or changed
      time: "",
      coordinates: "1.3521, 103.8198",
      options: ["Halal-certified", "Vegan", "Vegetarian", "Gluten-free"],
      dietaryNeeds: [],
      extra: "",
      checked: null,
    };
  },
  mounted() {
    navigator.geolocation.getCurrentPosition(this.setCoordinates);
  },
  methods: {
    setCoordinates: function (position) {
        this.coordinates = position.coords.latitude + ", " + position.coords.longitude;
    },
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

      axios.post(`${process.env.VUE_APP_BACKEND_URL}api/createdroom`, {
        code: generated_code,
        status: "open",
        coordinates: this.coordinates,
        settings: this.dietaryNeeds.join(" ")

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

.nes-input, #location {
  background: rgb(234, 234, 168);
  color: grey;
}

button {
  width: 100%;
  height: 100%;
}

body {
  height: 100%;
  background: linear-gradient(0deg,
      rgba(245, 200, 95, 0.66),
      rgba(245, 200, 95, 0.66)),
    url(../assets/bg1.jpeg);
}

.nes-container {
  background-color: #ededed;
}

#timePicker{
  background: rgb(234, 234, 168);
  border: solid black 1px
}
</style>
