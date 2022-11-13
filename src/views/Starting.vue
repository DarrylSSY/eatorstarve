<template>
  <div class="external" @load="starttimer">
    <div class="whole container">
      <div class="countdown">
        <div>
          <h3>Game Starting in...</h3>
        </div>
        <div class="cdcircle rounded rounded-circle">
          <h1>{{ countDown }}</h1>
        </div>
      </div>
    </div>
  </div>
  <div class="container p-0" style="margin: auto">
    <DialogueBox
      message="Remember to keep an eye on your HP!"
      style="text-align: left"
      type="developer"
    />
  </div>
</template>

<script>
import router from "@/router";
import { useSessionStore } from "../stores/session";
import axios from "axios";
import DialogueBox from "@/components/DialogueBox.vue";
// import { setTimeout } from "timers";

export default {
  name: "StartingView",
  components: { DialogueBox },
  setup() {
    const store = useSessionStore();
    return {
      username: store.getUsername,
    };
  },
  data() {
    return {
      code: this.$route.params.code,
      answered: [],
      value: "",
      countDown: 3,
    };
  },

  created() {
    this.countDownTimer();
  },

  mounted() {
    axios
      .get("http://localhost:8081/api/room/" + this.code)
      .then((response) => {
        this.answered = response.data;
      });
  },
  methods: {
    next: function () {
      router.push({ name: "Results", params: { id: this.code } });
    },
    get_avatar(user) {
      return "https://avatars.dicebear.com/api/pixel-art/" + user + ".svg";
    },
    //  countdown() {
    //   this.time -= 1
    //   //  setInterval(this.countdown(), 10000)

    //  },

    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        router.push({ name: "Question1", props: true });
      }
    },
  },
};
</script>

<style scoped>
.external {
  width: 100%;
  height: 100%;
}

.whole {
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
  background-color: rgba(245, 200, 95, 1);
  width: 210px;
  height: 210px;
  display: flex;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
