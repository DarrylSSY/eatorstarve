<template>
  <button v-on:click="next">Next</button>
  Hi {{username}}, this is Question 1
  <button v-on:click="home">Home</button>
</template>

<script>
import router from "@/router";

export default {
  name: "Question1View",
  data() {
    return {
      code: this.$route.params.code,
    }
  },
  props: ['username'],
  methods: {
    next: function (){
      router.push({ name: 'Question2', params: {id:this.code, username:this.username} })
    },
  }
}
</script>

<style scoped>

</style>