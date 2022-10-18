<template>
  {{question}} {{category}}
  <button v-on:click="option1">{{answer1}}</button>
  <button v-on:click="option2">{{answer2}}</button>
</template>

<script>
import { useSessionStore } from '../stores/session';
import axios from "axios";
export default {
  name: "QuestionComponent",
  props: {
    category: String,
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
      answer1: "a",
      answer2: "b",
      question: "Choose your ",
    }
  },
  mounted() {
    axios.get('http://localhost:8081/api/questions/cuisine').then(
        response => {
          this.answer1 = response['data'][0]['answer']
          this.answer2 = response['data'][1]['answer']
        }
    )
  },
  methods: {
    option1: function (){

      console.log(this.username + "selected" + this.answer1)
      axios.post('http://localhost:8081/api/answers', {
        code: this.code,
        username: this.username,
        answer: this.answer1,
        category: this.category
      })
    },
    option2: function (){
      console.log(this.username + "selected" + this.answer2)
      axios.post('http://localhost:8081/api/answers', {
        code: this.code,
        username: this.username,
        answer: this.answer2,
        category: this.category
      })
    },
  }

}
</script>

<style scoped>

</style>