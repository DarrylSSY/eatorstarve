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
      <div class="row gx-4" style="width: 100%; margin: auto;">
          <div class="col-xs-12 col-md-4">
              <img :src="'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' + result['photo'] + '&key=AIzaSyCDluC6rpLOcgskAumfnCWAOdGrAE1bb5M'" class="img-fluid rounded-start" alt="result" style="height: 100%; width: 100%; object-fit: cover;">
          </div>
          <div class=" col-xs-12 col-md-8">
              <div class="card-body" style="position: relative;">
                  <h5 class="card-title">{{result['name']}}</h5>
                  <p class="card-text">
                    <small class="text-muted">
                      <i class="nes-icon is-small star"></i>
                      {{result['rating']}}/5 <br>
                      ===>
                      [{{result['userratings']}} Users<i class="nes-icon coin is-small"></i>]
                    </small>


                    <br><br>
                    <b>Address: </b><br>
                    {{result['address']}}
                    <br><br>
                    <br><br>
                    <small class="price">
                      Price level: {{printCost(result['pricelevel'])}}
                    </small>
                    <br>
                  </p>
                  <!-- <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> -->
                  <a :href="'https://www.google.com/maps/search/?api=1&query=' + result['name']" target="_blank">
                    <button type="button" class="nes-btn is-warning open_map" @click="playSound">Open Map</button>
                  </a>
              </div>
          </div>
      </div>
    </div>
  </div>
  <div class="container p-0" style="margin: auto;">
    <DialogueBox :message="parameters"></DialogueBox>
  </div>
</template>

<script>
import { useSessionStore } from '../stores/session';
import axios from "axios";
import DialogueBox from './DialogueBox.vue';
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
        };
    },
    async mounted() {
        // qn 1
        await axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}/cuisine`).then(response => {
            this.parameters = response.data + ", ";
            // qn 2
        });
        await axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}/poultry`).then(response => {
            this.parameters += response.data + ", ";
        });
        // qn 3
        await axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}/price`).then(response => {
            if (response.data == "Rich Tai-Tai") {
                this.maxprice = 4;
                this.minprice = 3;
            }
            else if (response.data == "Middle-Class") {
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
            this.parameters += response.data + ", ";
        });
        // qn 5
        await axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}/base`).then(response => {
            this.parameters += response.data + ", ";
        });
        await axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}/spice`).then(response => {
            if (response.data == "Stomachache Come!!") {
                this.parameters += "spicy";
            }
            else if (response.data == "Little Kick") {
                this.parameters += "mild-spicy";
            }
            else {
                this.parameters += "non-spicy";
            }
        });
        await axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}/uniqueness`).then(response => {
            if (response.data == "Exotic") {
                this.parameters += ", unique";
            }
            else {
                this.parameters += " ";
            }
            // const keywords = useSessionStore()
            // keywords.setKeywords(this.parameters)
        });
        await axios.get(`${process.env.VUE_APP_BACKEND_URL}api/createdroom/info/${this.code}`).then(response => {
            this.parameters += response.data["settings"];
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
            axios.post(`${process.env.VUE_APP_BACKEND_URL}api/createdroom/${this.code}`, { "status": "close" });
            // this.first = [response["data"]["name1"], response["data"]["address1"], response["data"]["photo1"]]
            // this.second = [response["data"]["name2"], response["data"]["address2"], response["data"]["photo2"]]
            // this.third = [response["data"]["name3"], response["data"]["address3"], response["data"]["photo3"]]
            // console.log(response.data)
            // console.log(response['data'])
            for (let info in response["data"]) {
                // console.log(info)
                let category = info.substring(0, info.length - 1);
                let idx = info.substring(info.length - 1, info.length);
                if (idx == 1) {
                    this.first[category] = response["data"][info];
                }
                else if (idx == 2) {
                    this.second[category] = response["data"][info];
                }
                else {
                    this.third[category] = response["data"][info];
                }
            }
            this.result_list = [this.first, this.second, this.third];
            console.log(this.result_list);
        });
    },
    methods: {
        printCost: function (num) {
            if (num == null) {
                return "-";
            }
            // console.log(num)
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
    },
    components: { DialogueBox }
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
</style>
