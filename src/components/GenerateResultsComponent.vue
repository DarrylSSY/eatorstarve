<template>
  <!-- <button type="button" class="nes-btn is-success" @click="generate">Generate results</button> -->
  <!-- {{parameters}} -->
  <!-- <br>
  {{first}}
  <br>
  {{second}}
  <br>
  {{third}} -->

  
<!-- {{parameters}} -->
  <div v-for="result in result_list" :key="result.idx" class="carousel-item active">
    <div class="card">
      <div class="row gx-4">
          <div class="col-md-4">
              <img :src="'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' + result[2] + '&key=AIzaSyCDluC6rpLOcgskAumfnCWAOdGrAE1bb5M'" class="img-fluid rounded-start" alt="result" style="height: 100%; width: 100%; object-fit: cover;">
          </div>
          <div class="col-md-8">
              <div class="card-body">
                  <h5 class="card-title">{{result[0]}}</h5>
                  <p class="card-text">
                      <!-- {{details.rating}} 
                      <br> -->
                      <!-- {{details.type}}
                      <br> -->
                      {{result[1]}}
                      <br>
                      <!-- Located in: {{details.building_name}}
                      <br>
                      Status: {{details.opening_time}} -->
                  </p>
                  <!-- <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> -->
                  <!-- <button type="button" class="nes-btn is-warning open_map" @click="window.location.href='map_url'">Open URL</button> -->
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useSessionStore } from '../stores/session';
import axios from "axios";
export default {
  name: "GenerateResultsComponent",
  props: {
    code: String,
    para: Array,
  },
  setup () {
    const store = useSessionStore()
    return {
      username: store.getUsername
    }
  },
  data () {
    return {
      parameters: "",
      minprice: "",
      maxprice: "",
      first: [],
      second: [],
      third: [],
      result_list: [],
    }
  },
  mounted() {
      // qn 1
      axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}/cuisine`).then(response => {
        this.parameters = response.data + " "
        // qn 2
        axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}/poultry`).then(response => {
          this.parameters += response.data + " "
          // qn 3
          axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}/price`).then(response => {
            if (response.data == "Rich Tai-Tai") {
              this.maxprice = 4
              this.minprice = 3
            }
            else if (response.data == "Middle-Class") {
              this.maxprice = 2
              this.minprice = 1
            }
            else {
              this.maxprice = 1
              this.minprice = 0
            }
            // qn 4
            axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}/texture`).then(response => {
              this.parameters += response.data + " "
              // qn 5
              axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}/base`).then(response => {
                this.parameters += response.data + " "
                axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}/spice`).then(response => {
                  if (response.data == "Stomachache Come!!"){
                    this.parameters += "spicy "
                  }
                  else if (response.data == "Little Kick"){
                    this.parameters += "mild-spicy "
                  }
                  else {
                    this.parameters += "non-spicy "
                  }
                  axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}/uniqueness`).then(response => {
                    if (response.data == "Exotic"){
                      this.parameters += "unique "
                    }
                  })
                })
              })
            })
          })
          // generate place
          axios.post(`${process.env.VUE_APP_BACKEND_URL}api/places`,{"parameters":this.parameters, "maxprice":this.maxprice, "minprice":this.minprice})
              .then(response => {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}api/createdroom/${this.code}`, {"status": "close"})
                this.first = [response["data"]["name1"], response["data"]["address1"], response["data"]["photo1"]]
                this.second = [response["data"]["name2"], response["data"]["address2"], response["data"]["photo2"]]
                this.third = [response["data"]["name3"], response["data"]["address3"], response["data"]["photo3"]]
                // console.log(response.data)
                this.result_list = [this.first, this.second, this.third]

              })
        })
      })
      // this.result_list[0] = this.first
      // this.result_list[1] = this.second
      // this.result_list[2] = this.third
      // console.log(this.result_list)
      // console.log(this.first)
    },
  }
</script>

<style>
  .open_map {
    width: 100%;
  }

  .card, .card .row {
    width: 100%;
    height: 100%;
    border: 0px;
  }

  .card {
    height: 392px;
    width: auto;
  }
</style>