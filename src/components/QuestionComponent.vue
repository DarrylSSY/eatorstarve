<template>
  {{question}} {{category}} 
  <br>
  <button type="button" class="nes-btn is-success" @click="option1">{{answer1}}</button>
  <button type="button" class="nes-btn is-warning" @click="option2">{{answer2}}</button>
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
    function generate2RandomNumber(x){
      let num1 = Math.floor(Math.random() * x);
      let num2 = Math.floor(Math.random() * x);
      if (num2>0){
        num2 = num2 - 1
      }
      else if (num2<x) {
        num2 = num2 + 1
      }
      return [num1, num2];

    }
    axios.get('http://localhost:8081/api/questions/'+this.category).then(

        response => {
          let randomNum = generate2RandomNumber(response['data'].length);
          this.answer1 = response['data'][randomNum[0]]['answer']
          this.answer2 = response['data'][randomNum[1]]['answer']
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