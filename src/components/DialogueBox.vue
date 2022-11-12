<template>
  <div class="container box nes-container is-rounded p-1">
    <div class="row" style="width: 100%; margin: auto">
      <div
        class="col-3 col-sm-2 col-md-2 col-lg-2 p-0"
        style="display: flex; justify-content: center"
      >
        <i class="nes-octocat animate"></i>
      </div>
      <div class="col-9 col-sm-9 col-md-9 col-lg-10 text text-break px-2">
        <p v-if="message.length > 30">
          {{ message }}
        </p>
        <div v-else>
          <p class="typewriter d-none d-lg-block">
            {{ message }}
          </p>
          <p class="d-lg-none d-md-block">
            {{ message }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DialogueBox",
  props: {
    message: String,
    question: String,
    category: String,
  },

  created() {
    setTimeout(() => (this.visible = ``), 3500);
  },
};
</script>

<style>
.text p {
  margin: 0;
}

.box {
  height: 120px;
  width: 98vw;
  position: fixed;
  bottom: 0;
  box-sizing: border-box;
}

.text {
  padding: 10px 30px 0px 30px;
  align-items: center;
}

.typewriter {
  overflow: hidden;
  white-space: nowrap;
  letter-spacing: 0.15em;
  animation: typing 2.5s steps(40, end), blink-caret 0.75s step-end infinite;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>
