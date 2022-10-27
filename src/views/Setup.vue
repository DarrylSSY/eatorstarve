<template>

  <body>
    <div class="container-sm">
      <br>
      <div class="row">
        <div class="col text-center">
          <h1>Pre-Game Setup</h1>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <div class="nes-container is-rounded is-centered my-5 mx-auto">

            <div class="row">
              <input v-model="date" type="text" class="nes-input is-primary" placeholder="Date" />
            </div>

            <div class="row">
              <input v-model="time" type="text" class="nes-input is-primary" placeholder="Time" />
            </div>

            <div class="row">
              Special Dietary Needs:
            </div>
            <div class="row text-start mx-3">
              <div class="col-6">
                <label><input type="checkbox" class="nes-checkbox" :name="dietary"/><span>Halal-certified</span></label>
              </div>
              <div class="col-6">
                <label><input type="checkbox" class="nes-checkbox" :name="dietary"/><span>Vegan</span></label>
              </div>
              <div class="col-6">
                <label><input type="checkbox" class="nes-checkbox" :name="dietary"/><span>Vegetarian</span></label>
              </div>
              <div class="col-6">
                <label><input type="checkbox" class="nes-checkbox" :name="dietary"/><span>Gluten-free</span></label>
              </div>
              <div class="col-6">
                <label><input v-model="checked" type="checkbox" class="nes-checkbox" @click="prompt()"  /><span>Others:</span></label>
                <input  v-show="checked" type="text" class="nes-input is-primary" placeholder="Other requirements" /> 
                <!-- working on showing input box when others clicked -->
              </div>
              
            </div>

          </div>
        </div>
      </div>

    </div>
  </body>


</template>


<script>
import router from "@/router";
export default {
  name: "SetupView",
  data() {
    return {
      date: "",
      time: "",
      dietary: [],
      extra: "",
      clicked: false,
    }
  },
  methods: {
    create: function () {
      // Incomplete code
      // Generate random code
      let generated_code = Math.random().toString(36).slice(9)
      // Check if room exists

      let error = false
      // Keep generating until room doesn't exist
      while (error) {
        generated_code = Math.random().toString(36).slice(9)
        error = false
      }
      // Else create room
      router.push("room/" + generated_code)
    },
    prompt: function () {
      this.clicked=true
      let others = this.extra.split(",")
      for (var details of others){
        this.dietary.push(details)
      }
    }
  },

}
</script>

<style scoped>
input {
  width: 100%;
  height: 100%;
  background: rgb(234, 234, 168);
  text-align: center;

  color: grey;
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
  background: linear-gradient(0deg,
      rgba(245, 200, 95, 0.66),
      rgba(245, 200, 95, 0.66)),
    url(../assets/bg1.jpeg);
  box-shadow: 7px 12px 18px rgba(0, 0, 0, 0.25);
}

.nes-container {
  width: 50%;
  background-color: #EDEDED;
  ;
}
</style>
