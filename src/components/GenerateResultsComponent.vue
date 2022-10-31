<template>
  <button type="button" class="nes-btn is-success" @click="generate">Generate results</button>
  {{parameters}}
  <br>
  {{first}}
  <br>
  {{second}}
  <br>
  {{third}}
</template>

<script>
import { useSessionStore } from '../stores/session';
import axios from "axios";
export default {
  name: "GenerateResultsComponent",
  props: {
    code: String
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
    }
  },
  mounted() {
  },
  methods: {
    generate: function (){
      // qn 1
      axios.get('http://localhost:8081/api/room/'+this.code+"/cuisine").then(response => {
        this.parameters = response.data + " "
        // qn 2
        axios.get('http://localhost:8081/api/room/'+this.code+"/poultry").then(response => {
          this.parameters += response.data + " "
          // qn 3
          axios.get('http://localhost:8081/api/room/'+this.code+"/price").then(response => {
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
            axios.get('http://localhost:8081/api/room/'+this.code+"/texture").then(response => {
              this.parameters += response.data + " "
              // qn 5
              axios.get('http://localhost:8081/api/room/'+this.code+"/base").then(response => {
                this.parameters += response.data + " "
                axios.get('http://localhost:8081/api/room/'+this.code+"/spice").then(response => {
                  if (response.data == "Stomachache Come!!"){
                    this.parameters += "spicy "
                  }
                  else if (response.data == "Little Kick"){
                    this.parameters += "mild-spicy "
                  }
                  else {
                    this.parameters += "non-spicy "
                  }
                  axios.get('http://localhost:8081/api/room/'+this.code+"/uniqueness").then(response => {
                    if (response.data == "Exotic"){
                      this.parameters += "unique "
                    }
                  })
                })
              })
            })
          })
          // generate place
          axios.post('http://localhost:8081/api/places',{"parameters":this.parameters, "maxprice":this.maxprice, "minprice":this.minprice})
              .then(response => {
                axios.post('http://localhost:8081/api/createdroom/' + this.code, {"status": "close"})
                this.first = [response["data"]["name1"], response["data"]["address1"]]
                this.second = [response["data"]["name2"], response["data"]["address2"]]
                this.third = [response["data"]["name3"], response["data"]["address3"]]
              })
        })
      })

    },
  }

}
</script>