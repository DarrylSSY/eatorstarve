<template>
  {{question}} {{category}} 
  <br>
  <div class="container-fluid">
    <div class="row">
      <div class="nes-badge position-absolute">
        <span class="is-dark position-absolute">OR</span>
      </div>
      <div class="col-6 row offset-3">
        <button type="button" class="nes-btn is-success option-btn" @click="option1">{{answer1}}</button>
      </div>
      <div class="col-6 row offset-3">
        <button type="button" class="nes-btn is-warning option-btn" @click="option2">{{answer2}}</button>
      </div>
      </div>
  </div>
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
<style>
.option-btn{
  height: 30vh;
  font-size: 3vw;
  width: 100%;
}

.nes-badge{
  z-index: 100;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.is-dark{
  z-index: 100;
  top: 50%;
  left: 50%;
  margin: 0;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>