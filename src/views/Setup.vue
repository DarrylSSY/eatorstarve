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
            
            <!-- date calendar -->
            <div class="row mb-2">
              <input v-model="date" type="text" class="nes-input is-primary" placeholder="Date" />
            </div>
            
            <!-- time input -->
            <div class="row mb-2">
              <input v-model="time" type="text" class="nes-input is-primary" placeholder="Time" />
            </div>
            
            <!-- dietary needs options -->
            <div class="row">
              Special Dietary Needs:
            </div>
            
            <div id="options" class="row text-start mx-3">
              <div v-for="option of options" :key="option.id">
                  <label><input v-model="dietaryNeeds" type="checkbox" class="nes-checkbox" :value="option"/><span>{{option}}</span></label>
                
              </div>
              
              <div class="col">
                <label><input v-model="checked" type="checkbox" class="nes-checkbox col" />
                  <span>Others:
                    <input v-show="checked" v-model="extra" type="text" class="nes-input is-primary col"  placeholder="Other requirements" /> 
                  </span></label>
              </div>

            </div>

            <!-- submit button -->
            <div class="row mt-2">
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
export default {
  name: "SetupView",
  data() {
    return {
      date: "",
      time: "",
      options: ["Halal-certified", "Vegan", "Vegetarian", "Gluten-free"],
      dietaryNeeds: [],
      extra: "",
      checked: null,
    }
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
#options{
  font-size: 80%;
}
</style>
