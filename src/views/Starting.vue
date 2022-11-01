<template>
    <div class="external">
   <div class="whole container">   
 
     <div class="countdown">
        <div>
            <h2>Game Starting in...</h2>
        </div>
        <div>
            
        </div>
     </div>
        
 
 
     
 
     
 
     
       <div class="text_component container nes-container is-rounded">
         <p>Remember to keep an eye on your HP!</p>
       </div>
   </div>
</div>

   
     
 
 </template>
 
 
 
 <script>
 import router from "@/router";
 import { useSessionStore } from '../stores/session';
 import axios from "axios";
 
 
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
       visible: "hidden",
       busy: false,
       processing: false
 
 
     }
   },
 
   created() {
     setTimeout(() => this.visible =  ``, 3500)
   },
 
   mounted() {
     axios.get('http://localhost:8081/api/room/' + this.code).then(response => {
       this.answered = response.data
     })
   },
   methods: {
     next: function (){
       router.push({ name: 'Results', params: {id:this.code} })
     },
     get_avatar(user) {
       return "https://avatars.dicebear.com/api/pixel-art/" + user + ".svg"
     }, 
     enter() {
       if (this.value == 'yes') {
         // alert("yes")
         document.getElementById('dialog-rounded').showModal();
       } else {
         // alert("no")
         document.getElementById('dialog-rounded2').showModal();
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
    top: 20%;

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