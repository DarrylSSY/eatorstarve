<template>

    <div v-if="data_loaded">
      <div class="carousel-item active">
        <div class="card">
          <div class="row gx-4" style="width: 100%; margin: auto;">
            <div class="col-xs-12 col-md-4" style="height: fit-content;">
              <img :src="'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' + result_list[0]['photo'] + '&key=AIzaSyCDluC6rpLOcgskAumfnCWAOdGrAE1bb5M'" class="img-fluid rounded-start" alt="result" >
            </div>
            <div class=" col-xs-12 col-md-8">
              <div class="card-body" style="position: relative;">
                <h5 class="card-title">{{result_list[0]['name']}}</h5>
                <p class="card-text">
                  <small class="text-muted">
                    <i class="nes-icon is-small star"></i>
                    {{result_list[0]['rating']}}/5 <br>
                    ===>
                    [{{result_list[0]['userratings']}} Users<i class="nes-icon coin is-small"></i>]
                  </small>


                  <br><br>
                  <b>Address: </b><br>
                  {{printAddress(result_list[0]['address'])}}
                  <br><br>
                  <br><br>
                  <small class="price">
                    Price level: {{printCost(result_list[0]['pricelevel'])}}
                  </small>
                  <br>
                </p>
                <!-- <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> -->
                <a :href="'https://www.google.com/maps/search/?api=1&query=' + result_list[0]['name']" target="_blank">
                  <button type="button" class="nes-btn is-warning open_map" @click="playSound">Open Map</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <div class="card">
          <div class="row gx-4" style="width: 100%; margin: auto;">
            <div class="col-xs-12 col-md-4" style="height: fit-content;">
              <img :src="'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' + result_list[1]['photo'] + '&key=AIzaSyCDluC6rpLOcgskAumfnCWAOdGrAE1bb5M'" class="img-fluid rounded-start" alt="result" >
            </div>
            <div class=" col-xs-12 col-md-8">
              <div class="card-body" style="position: relative;">
                <h5 class="card-title">{{result_list[1]['name']}}</h5>
                <p class="card-text">
                  <small class="text-muted">
                    <i class="nes-icon is-small star"></i>
                    {{result_list[1]['rating']}}/5 <br>
                    ===>
                    [{{result_list[1]['userratings']}} Users<i class="nes-icon coin is-small"></i>]
                  </small>


                  <br><br>
                  <b>Address: </b><br>
                  {{printAddress(result_list[1]['address'])}}
                  <br><br>
                  <br><br>
                  <small class="price">
                    Price level: {{printCost(result_list[1]['pricelevel'])}}
                  </small>
                  <br>
                </p>
                <!-- <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> -->
                <a :href="'https://www.google.com/maps/search/?api=1&query=' + result_list[1]['name']" target="_blank">
                  <button type="button" class="nes-btn is-warning open_map" @click="playSound">Open Map</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <div class="card">
          <div class="row gx-4" style="width: 100%; margin: auto;">
            <div class="col-xs-12 col-md-4" style="height: fit-content;">
              <img :src="'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' + result_list[2]['photo'] + '&key=AIzaSyCDluC6rpLOcgskAumfnCWAOdGrAE1bb5M'" class="img-fluid rounded-start" alt="result" >
            </div>
            <div class=" col-xs-12 col-md-8">
              <div class="card-body" style="position: relative;">
                <h5 class="card-title">{{result_list[2]['name']}}</h5>
                <p class="card-text">
                  <small class="text-muted">
                    <i class="nes-icon is-small star"></i>
                    {{result_list[2]['rating']}}/5 <br>
                    ===>
                    [{{result_list[2]['userratings']}} Users<i class="nes-icon coin is-small"></i>]
                  </small>


                  <br><br>
                  <b>Address: </b><br>
                  {{printAddress(result_list[2]['address'])}}
                  <br><br>
                  <br><br>
                  <small class="price">
                    Price level: {{printCost(result_list[2]['pricelevel'])}}
                  </small>
                  <br>
                </p>
                <!-- <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> -->
                <a :href="'https://www.google.com/maps/search/?api=1&query=' + result_list[2]['name']" target="_blank">
                  <button type="button" class="nes-btn is-warning open_map" @click="playSound">Open Map</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
        <div class="carousel-item active"  style="text-align: center; color: grey; height: 300px;">
            <h3>Loading...</h3>
            Meanwhile, let's chill a little.
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
    },
    emits: ["getChoices"],
    setup() {
        const store = useSessionStore();
        return {
            username: store.getUsername
        };
    },
    data() {
        return {
            parameters: "",
            minprice: "",
            maxprice: "",
            coordinates: "",
            first: {},
            second: {},
            third: {},
            result_list: [],
            data_loaded: false
        };
    },
    async mounted() {
        // qn 1
        await axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}/cuisine`).then(response => {
            this.parameters = response.data + "|";
            // qn 2
        });
        await axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}/poultry`).then(response => {
            this.parameters += response.data + "|";
        });
        // qn 3
        await axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}/price`).then(response => {
            if (response.data == "2") {
                this.maxprice = 4;
                this.minprice = 3;
            }
            else if (response.data == "1") {
                this.maxprice = 2;
                this.minprice = 1;
            }
            else {
                this.maxprice = 1;
                this.minprice = 0;
            }
        });
        // qn 4
        await axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}/texture`).then(response => {
            this.parameters += response.data + "|";
        });
        // qn 5
        await axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}/base`).then(response => {
            this.parameters += response.data + "|";
        });
        await axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}/spice`).then(response => {
            if (response.data == "2") {
                this.parameters += "spicy|";
            }
            else if (response.data == "1") {
                this.parameters += "mild-spicy|";
            }
            else {
                this.parameters += "non-spicy|";
            }
        });
        await axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}/uniqueness`).then(response => {
            if (response.data == "Exotic") {
                this.parameters += "unique";
            }
        });
        await axios.get(`${process.env.VUE_APP_BACKEND_URL}api/createdroom/info/${this.code}`).then(response => {
            if (response.data["settings"] != "") {
              this.parameters = response.data["settings"] + "|" + this.parameters;
            }

            this.coordinates += response.data["coordinates"];
        });
        this.$emit("getChoices", this.parameters);
        // generate place
        axios.post(`${process.env.VUE_APP_BACKEND_URL}api/places`, {
            "parameters": this.parameters,
            "maxprice": this.maxprice,
            "minprice": this.minprice,
            "coordinates": this.coordinates
        })
            .then(response => {
              if (response["data"]["name1"]) {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}api/createdroom/${this.code}`, { "status": "close" });
                for (let info in response["data"]) {
                  let category = info.substring(0, info.length - 1);
                  let idx = info.substring(info.length - 1, info.length);
                  if (idx == 1) {
                    this.first[category] = response["data"][info];
                  } else if (idx == 2) {
                    this.second[category] = response["data"][info];
                  } else {
                    this.third[category] = response["data"][info];
                  }
                }
                this.result_list = [this.first, this.second, this.third];
                this.data_loaded = true
              }
              else {
                axios.post(`${process.env.VUE_APP_BACKEND_URL}api/places`, {
                  "parameters": "",
                  "maxprice": 4,
                  "minprice": 0,
                  "coordinates": this.coordinates
                })
                  .then(response => {
                    if (response["data"]) {
                      axios.post(`${process.env.VUE_APP_BACKEND_URL}api/createdroom/${this.code}`, { "status": "close" });
                      for (let info in response["data"]) {
                        let category = info.substring(0, info.length - 1);
                        let idx = info.substring(info.length - 1, info.length);
                        if (idx == 1) {
                          this.first[category] = response["data"][info];
                        } else if (idx == 2) {
                          this.second[category] = response["data"][info];
                        } else {
                          this.third[category] = response["data"][info];
                        }
                      }
                      this.result_list = [this.first, this.second, this.third];
                      this.data_loaded = true
                    }
                  })
              }
              });
    },
    methods: {
        printCost: function (num) {
            if (num == null) {
                return "-";
            }
            let str = "";
            for (let i = 0; i < num; i++) {
                str += "$";
            }
            return str;
        },
        playSound() {
            let buttonpress = new Audio("../../buttonpress.mp3");
            buttonpress.play();
        },
        printAddress: function (address) {
            console.log(address)
            if (address == null) {
                return "No address available. Open map to see more."
            }
            else {
                return address
            }
        }
    },
}
</script>

<style>
  .open_map {
    width: 80%;
    /* position: absolute;
    bottom: 0; */
  }

  .card, .card .row {
    width: 100%;
    height: 100%;
    border: 0px;
  }

  .card-body, .card-item {
    height: 100%;
  }
  .card {
    height: 90%;
    width: auto;
  }

  /* .price {
    position: absolute;
    bottom: 70px;
  } */

  .card-title {
    font-size: (2vw,5vw);
  }

  .card img {
    height: 50vh;
    /* max-height: 50vh; */
    width: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 767px) {
        .card img {
            height: 10vh;
        }

    }

</style>
