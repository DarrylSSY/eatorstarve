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
        <div class="col">
          <div class="nes-container is-rounded is-centered my-5 mx-auto">

            <!-- date and time input -->
            <div id="day" class="row mb-3 mx-auto">
              <Datepicker
                v-model="date"
                class="nes-input is-primary dp__theme_dark"
                placeholder="Date & Time"
                :min-date="new Date()"
                :is24="false"
              >
              </Datepicker>
            </div>

            <!-- dietary needs options -->
            <div class="row mx-auto mb-3">Special Dietary Needs:</div>

            <div id="options" class="row text-start mb-3 mx-auto">
              <div v-for="option of options" :key="option.id">
                <label
                  ><input
                    v-model="dietaryNeeds"
                    type="checkbox"
                    class="nes-checkbox"
                    :value="option"
                  /><span>{{ option }}</span></label
                >
              </div>

              <div class="col">
                <label
                  ><input
                    v-model="checked"
                    type="checkbox"
                    class="nes-checkbox col" />
                  <span
                    >Others:
                    <input
                      v-show="checked"
                      v-model="extra"
                      type="text"
                      class="nes-input is-primary col"
                      placeholder="Other requirements"
                    /> </span
                ></label>
              </div>
            </div>

            <!-- submit button -->
            <div class="row mx-auto">
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
      router.push("room/" + generated_code);
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
button {
  width: 100%;
  height: 100%;
  /* bg color not working */
  background-color: #f5c85f;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

h1 {
  font-size: 60px;
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
  box-shadow: 7px 12px 18px rgba(0, 0, 0, 0.25);
}

.nes-container {
  width: 50%;
  background-color: #ededed;
}

#options {
  font-size: 80%;
}
</style>
