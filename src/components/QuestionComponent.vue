<template>
  <div class="nes-container with-title is-centered is-rounded">
    <p class="title">Question 1</p>
    <p>{{question}} {{category}}!</p>
  </div>
  <div class="container-fluid">
    <!-- <div class="row">
      <div class="nes-badge position-absolute">
        <span class="is-dark position-absolute">OR</span>
      </div>
    </div> -->
    <!-- Option 1 -->
    <div class="col-8 row offset-2">
      <button type="button" class="nes-btn is-success option-btn" @click="option1">{{answer1}}</button>
    </div>
    <!-- OR -->
    <div class="card col-8 row offset-2">
      <div class="card-body">
        -------- OR --------
      </div>
    </div>
    <!-- Option 2 -->
    <div class="col-8 row offset-2">
      <button type="button" class="nes-btn is-warning option-btn" @click="option2">{{answer2}}</button>
    </div>
  </div>
</template>

<script>
import { useSessionStore } from '../stores/session';
import axios from "axios";
import router from "@/router";
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
      next: "Question2"
    }
  },
  mounted() {

    if (this.category=="cuisine"){
      this.next="Question2"
    }
    else {
      this.next="Holding"
    }
    function generate2RandomNumber(x){
      let num1 = Math.floor(Math.random() * x);
      let num2 = Math.floor(Math.random() * x);
      if (num1 == num2) {
        if (num2 > 0) {
          num2 = num2 - 1
        } else if (num2 < x) {
          num2 = num2 + 1
        }
      }
      return [num1, num2]
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
      axios.post('http://localhost:8081/api/answers', {
        code: this.code,
        username: this.username,
        answer: this.answer1,
        category: this.category
      })
      router.push({ name: this.next, params: {id:this.code} })
    },
    option2: function (){
      console.log(this.username + "selected" + this.answer2)
      axios.post('http://localhost:8081/api/answers', {
        code: this.code,
        username: this.username,
        answer: this.answer2,
        category: this.category
      })
      router.push({ name: this.next, params: {id:this.code} })
    },
  }

}
</script>
<style>
.option-btn{
  height: 20vh;
  font-size: 3vw;
  width: 100%;
  margin: 5px 0px;
  
}

/* .nes-badge{
  z-index: 100;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
} */

/* .is-dark{
  z-index: 100;
  top: 50%;
  left: 50%;
  margin: 0;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
} */
.card{
  border: none;
}
</style>