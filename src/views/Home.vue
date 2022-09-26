<template>
  <div class="home">
    <h5>If you can see the animation below, Rive.JS is working</h5>
    <canvas id="canvas" width="400" height="300"></canvas>
    <h5>If you can see the code below, code generation is working</h5>
    <p>{{ msg }}</p>
    <h5>If you can see the address below, Google Places API is working</h5>
    <p>{{ location }}</p>
    <h5>If you see the avatar below, DiceBear API is working</h5>
    <img style="width: 100px" src="https://avatars.dicebear.com/api/pixel-art/darryl.svg">
    <h5>If you see a black button, SCSS is working</h5>
    <button type="button" class="btn btn-primary">Primary</button>
    <h5>If you see a retro button, NES.css is working</h5>
    <button type="button" class="nes-btn is-primary">Primary</button>
  </div>
</template>

<script>
import {Rive} from "rive-js";
import axios from "axios";
export default {
  name: 'HomeView',
  data () {
    return {
      location: null,
      avatar: null
    }
  },
  props: {
    msg: String
  },
  mounted() {
    new Rive({
      src: 'https://cdn.rive.app/animations/off_road_car_v7.riv',
      canvas: document.getElementById("canvas"),
      autoplay: true
    });
    axios.get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=chinese vegetarian&inputtype=textquery&key=AIzaSyCDluC6rpLOcgskAumfnCWAOdGrAE1bb5M&fields=formatted_address,name,geometry\n')
        .then(response => {
          console.log(response);
          this.location = response.data.candidates[0].formatted_address;
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
