<template>

  <body>
    <div class="container-sm">
      <br />
      <div class="row gx-4 home-body">

        <div class="col-12">
          <h1 class="text-center">Eat or Starve</h1>
        </div>

          <div class="col-4"></div>
          <div class="col-4 col-md-4 col-lg-4">
            <div class="nes-container is-rounded is-centered">
  
                <div class="col-12">
                  <input v-model="code" type="text" class="nes-input is-primary" placeholder="Room Code" />
                </div>
      
                <div class="col-12">
                  <button v-if="error == false && code!='' " type="button" class="nes-btn is-warning" @click="join">
                    Join
                  </button>

                  <button v-else type="button" class="nes-btn is-disabled" onclick="document.getElementById('dialog-rounded').showModal();">
                    Join
                  </button>
                  <dialog id="dialog-rounded" class="nes-dialog is-rounded" >
                    <form method="dialog">
                      <h2 class="">Error</h2>
                      <p>Wrong room code. Check again.</p>
                      <menu class="dialog-menu ps-0">
                        <button class="nes-btn is-warning">Ok</button>
                      </menu>
                    </form>
                  </dialog>

       
                
              </div>
<div class="col-3"></div>
                <div class="col-12">
                  <span class="align-middle"> --- OR --- </span>
                </div>
        

  
                <div class="col-12">
                  <button type="button" class="nes-btn is-warning" @click="create">
                    Create
                  </button>
                </div>
            </div>
          </div>
   

          <div class="nes-balloon from-left col-10">
            <p>
              Welcome to <b>Eat or Starve</b> where we help to give suggestions on
              where your next food adventure should be. <br /><br />
              Simply create a new game or join one hosted by your friend to
              kickstart the game of choice!
            </p>
          </div>



          <i class="nes-octocat animate pl-3 col-12"></i>

      </div>
</div>
  </body>
</template>

<script>
import router from "@/router";
export default {
  name: "RoomView",
  data() {
    return {
      code: "",
      logo: "Eat or Starve",
      error: false,
    };
  },
  methods: {
    join: function () {
      // Incomplete code
      // Check if room exists
      let buttonpress = new Audio("../../buttonpress.mp3");
      buttonpress.play();


      // If don't exist , give error

      //no error, push to new page
      router.push("room/" + this.code);
    },
    create: function () {
      let buttonpress = new Audio("../../buttonpress.mp3");
      buttonpress.play();
      router.push("setup");
    },
  },
};
</script>

<style scoped>

input {
  width: 100%;
  height: 100%;
  background: rgb(234, 234, 168);
  text-align: center;

  color: black;
}

button {
  width: 100%;
}


body {
  height: 100%;
  
  background: linear-gradient(0deg,
      rgba(245, 200, 95, 0.66),
      rgba(245, 200, 95, 0.66)),
    url(../assets/bg1.jpeg);
  box-shadow: 7px 12px 18px rgba(0, 0, 0, 0.25);
}

.container-sm{
  height: 100%;
}
.home-body{
  height: 100%;
}
.nes-container {
  background-color: #ededed;
  height: fit-content;
}
</style>
