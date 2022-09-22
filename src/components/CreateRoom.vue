<template>
  This page is for creating room ya - darryl &#60;3
  Check chrome console for information after pressing submit
  <form @submit="onSubmit">
  <button type="submit">YAY ADD</button>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  name: "CreateRoom",
  data () {
    return {
      room: {}
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      axios.post(`http://localhost:8081/api/room`, this.room)
          .then(res => {
            console.log(res)
            console.log(res.data)
          })
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>