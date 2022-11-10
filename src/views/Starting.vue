<template>
    <div class="external" @load="starttimer">
   <div class="whole container">   
 
     <div class="countdown">
        <div>
            <h3>Game Starting in...</h3>
        </div>
        <div class="cdcircle rounded rounded-circle">
            <h1> {{countDown}}</h1>
        </div>
     </div>
        
       <div class="text_component container nes-container is-rounded">
         <h5>Remember to keep an eye on your HP!</h5>
       </div>
   </div>
</div>

   
     
 
 </template>
 
 
 
 <script>
 import router from "@/router";
 import { useSessionStore } from '../stores/session';
 import axios from "axios";
// import { setTimeout } from "timers";
 
 
 export default {
   name: "StartingView",
   setup() {
     const store = useSessionStore()
     return {
       username: store.getUsername
     }
   },
   data() {
     return {
       code: this.$route.params.code,
       answered: [],
       value: "",
       countDown: 3
 
 
     }
   },
 
   created() {
      // setInterval(this.countdown(), 1000)
      this.countDownTimer()
           
   },
 
   mounted() {
     axios.get('http://localhost:8081/api/room/' + this.code).then(response => {
       this.answered = response.data
     })

   
    
    // setTimeout(this.countdown(), 1000)
   },
   methods: {
     next: function (){
       router.push({ name: 'Results', params: {id:this.code} })
     },
     get_avatar(user) {
       return "https://avatars.dicebear.com/api/pixel-art/" + user + ".svg"
     },
    //  countdown() {
    //   console.log("timer")
    //   console.log(typeof(this.time))
    //   console.log(this.time)
    //   this.time -= 1
    //   console.log(this.time)
    //   //  setInterval(this.countdown(), 10000)

    //  },

     countDownTimer () { 
      if (this.countDown > 0) { 
        setTimeout(() => {
          this.countDown -= 1 
          this.countDownTimer() 
        }, 1000) } 
        else {
          router.push({ name: "Question1", props: true });
        }

      
      } 
    
    }
     
   }
 
   
 
 </script>
 
 <style scoped>

 .external {
    width: 100%;
   height: 100%;
  


   
 }
 
 .whole {
   text-align: center;
   position: relative;
   margin: auto;
   width: 100%;
   height: 100%;
   
 }

 .countdown {
    position: absolute;
    left: 0;
    right: 0;
    top: 25%;

 }
 
 .cdcircle {
  background-color:rgba(245, 200, 95, 1);
  width: 210px;
  height: 210px;
  display: flex;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  justify-content: center;
  align-items:center;
 }
 
 

 
 div.main_component {
   margin-right: auto;
   margin-left: auto;
   margin-top: 100px;
   margin-bottom: 10px;
   width: 60%;
   height: auto;
   /* position: sticky; This shit doesnt work */
   bottom: 0;
   background-color: rgb(247, 213, 29);
   margin-bottom: 20px;
   
 }
 
div.text_component {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 40px;
    height: 150px;
    font-size: 25px;
   
 }
   
   
 

 
 
 
 
 
 

 
 
 
 </style>