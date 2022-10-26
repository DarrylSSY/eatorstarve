<template>
  <br>
  <dialog class="nes-dialog is-rounded" id="dialog-rounded">
    <form method="dialog">
      <p class="title">Are you sure you want to exit?</p>
      <p>Your progress will not be saved.</p>
      <menu class="dialog-menu">
        <button class="nes-btn">Cancel</button>
        <button class="nes-btn is-primary" @click="home">Confirm</button>
      </menu>
    </form>
  </dialog>
  <div class="row gx-4">
    <div class="col-4 col-md-2 ps-0">
      <button type="button" class="nes-btn is-error" onclick="document.getElementById('dialog-rounded').showModal();">Quit</button>
    </div>
    <div class="col-8 col-md-10 pe-0"><progress class="nes-progress is-error" value="30" max="100"></progress>
    </div>
    <div class="col-1" />
    <div class="nes-container is-rounded col-10 game-options">
      <button type="button" class="game-option nes-btn is-primary" @click="option1"><h3>{{answer1}}</h3></button>
      <div class="auto-layout"><div class="line" /> <h4>OR</h4> <div class="line" /></div>
      <button type="button" class="game-option nes-btn is-warning" @click="option2"><h3>{{answer2}}</h3></button>
    </div>
    <div class="col-1" />
    <div class="chat-box nes-container is-centered is-rounded col-12">
      <h2>{{question}} {{category}}</h2>
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
    home: function (){
      router.push("/")
    },
  }

}
</script>

<style scoped>
.nes-btn {
  height: 64px;
  width: calc(100% - 8px);
}

.nes-progress {
  width: calc(100% - 8px);
  height: 64px;
}

.line {
  width: 32%;
  border: 4px solid #000000;
  margin: 8px;
  vertical-align: top;
}

.game-option {
  width: 100%;
  aspect-ratio: 6/1;
  height: auto;
}

.game-options {
  margin-top: 64px;
  margin-bottom: 64px;
}

.auto-layout {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 28px;
  width: 100%;
}

.auto-layout h4 {
  margin-bottom: 0;
}

.chat-box {
  height: 136px;
  width: calc(100% - 8px);
  display: flex;
  justify-content: center;
  align-items: center;
}



</style>