<template>
  <div class="container-fluid row">
    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-4">
      <!-- Home Button -->
      <button type="button" class="nes-btn is-primary home_btn" onclick="document.getElementById('dialog-rounded').showModal();">
        Home
      </button>
      <dialog id="dialog-rounded" class="nes-dialog is-rounded" >
        <form method="dialog">
          <p class="title">Are you sure you want to exit?</p>
          <p>Your progress will not be saved.</p>
          <menu class="dialog-menu">
            <button class="nes-btn">Cancel</button>
            <button class="nes-btn is-primary" @click="home">Confirm</button>
          </menu>
        </form>
      </dialog>
    </div>
    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-6 col-4">
      <!-- Progress Bar -->
      <progress class="nes-progress is-error progress_bar" value="10" max="100"></progress>
    </div>
    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-4">
      <!-- Next button -->
      <button type="button" class="nes-btn is-primary next_btn" @click="next">Next</button>
    </div>
    <div class="main col-12 align-items-center">
      <QuestionComponent category="spice" :code="code" />
      <UsernameCheckerComponent />
    </div>
  </div>

    <div class="fixed-bottom">
      <div class="row align-items-end">
      <!-- Avatar-->
      <div class="col-1">
        <img src="https://avatars.dicebear.com/api/pixel-art/sarah.svg">
      </div>

      <!-- Timer -->
      <div class="col-7">
        <i class="nes-icon is-medium heart"></i>
        <i class="nes-icon is-medium heart"></i>
        <i class="nes-icon is-medium heart"></i>
        <i class="nes-icon is-medium heart"></i>
        <i class="nes-icon is-medium heart"></i>
        <i class="nes-icon is-medium heart"></i>
        <i class="nes-icon is-medium heart"></i>
        <i class="nes-icon is-medium heart"></i>
        <i class="nes-icon is-medium is-half heart"></i>
        <i class="nes-icon is-medium is-transparent heart"></i>
      </div>
        <div class="col-4"></div>
    <!-- Footer which is the text box for the question number -->
    <div class="nes-container is-rounded col-12">
      <p>Hi {{username}}, this is Question 3</p>
    </div>
      </div>
  </div>
    
    
    


</template>

<script>
import router from "@/router";
import { useSessionStore } from '../stores/session';
import QuestionComponent from "../components/QuestionComponent";
import UsernameCheckerComponent from "../components/UsernameCheckerComponent";

export default {
  name: "Question3View",
  components: {
    UsernameCheckerComponent,
    QuestionComponent
  },
  setup() {
    const store = useSessionStore()
    return {
      username: store.getUsername
    }
  },
  data() {
    return {
      code: this.$route.params.code,

    }
  },
  methods: {
    next: function (){
      router.push({ name: 'Question4', params: {id:this.code} })
    },
  },
}
</script>

<style scoped>
.nes-btn {
  width: 100%;
}

/* .header{
  position: fixed;
  top: 0px;
  width: 100%;
  white-space: nowrap;
  margin: auto;
} */
/* * {
  max-width: 1000px;
} */
/* .home_btn{
  position: fixed;
  top: 0px;
  left: 0px;
  margin: 10px;
}
.next_btn{
  position: fixed;
  top: 0px;
  right: 0px;
  margin: 10px;
}
.progress_bar{
  width: 100%;
  margin: 10px 150px 10px 150px;
  overflow: hidden;
  display: inline-block;
} */
/* .main{
  margin: 100px;
} */
/*.timer{*/
/*  position: fixed;*/
/*  bottom: 170px;*/
/*  left: 140px;*/
/*}*/
/*.avatar{*/
/*  position: fixed;*/
/*  bottom: 170px;*/
/*  width: 120px; */
/*  left: 10px;*/
/*}*/
/*.footer{*/
/*  bottom: 8px;*/
  /*height: 150px;*/
  /*!* margin-left: auto;*/
  /*margin-right: auto; *!*/
  /*margin: auto*/
  /*;*/
  /* border-width: 5px; */
/*}*/

/*.nes-container{*/
/*  width: 100%;*/
/*}*/
</style>