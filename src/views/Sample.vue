<template>
  <div class="Sample">
    <h5>If you can see the animation below, Rive.JS is working</h5>
    <canvas id="canvas" width="400" height="300"></canvas>
    <h5>If you can see the code below, code generation is working</h5>
    <p>{{ msg }}</p>
    <h5>If you can see the address below, Google Places API is working</h5>
    <p>{{ place }}</p>
    <p>{{ location }}</p>
    <h5>If you see the avatar below, DiceBear API is working</h5>
    <img style="width: 100px" src="https://avatars.dicebear.com/api/pixel-art/sarah.svg">
    <img :src="image" />
    <h5>If you see a black button, SCSS is working</h5>
    <button type="button" class="btn btn-primary">Primary</button>
    <h5>If you see a retro button, NES.css is working</h5>
    <button type="button" class="nes-btn is-primary">Primary</button>
  </div>
  <YesNoRadioVue @yes-function="something()"/>
</template>

<script>
import {Rive} from "@rive-app/canvas";
import YesNoRadioVue from '../components/YesNoRadio.vue'
import axios from "axios";
export default {
  name: 'HomeView',
  components: { YesNoRadioVue },
  props: {
    msg: String
  },
  data () {
    return {
      place : null,
      location: null,
      avatar: null,
      image: null
    }
  },
  mounted() {
    new Rive({
      src: 'https://cdn.rive.app/animations/vehicles.riv',
      canvas: document.getElementById("canvas"),
      autoplay: true
    });
    axios.get('')
    axios.post(`${process.env.VUE_APP_BACKEND_URL}api/places`,{"parameters":"seafood"})
        .then(response => {
          this.place = response["data"]["name"]
          this.location = response["data"]["address"]
        })
    axios.post(`${process.env.VUE_APP_BACKEND_URL}api/photo`,{"photo":"AW30NDywsbnpEINz6zUUcmszaJ4ACS057IryqfKz2kVyMi0Toc4c9-dei-faG10cpPggpFpvPK_Ps_nzgEieF_itLEXWil1rc9BxgoAGqTeVjhgDxsFq4fUG2NAsP2-0pXqxx8zxzVAUC61UNGKQb3Qczy7CzFB1jH4ZFpp35EOQcGU2wYeo"})
        .then(response => {
          console.log(response["data"])
          let blob = new Blob([response["data"]], {type: 'image/jpeg'});
          this.image = URL.createObjectURL(blob)
          console.log(this.image)
        })

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#index {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
