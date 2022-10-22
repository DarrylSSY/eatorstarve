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
          // generate place
          axios.post('http://localhost:8081/api/places',{"parameters":this.parameters})
              .then(response => {
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