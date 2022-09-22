<template>
  TIME FOR YOU TO JOIN A ROOM WOO
  <form @submit="onSubmit">
    <input id="nickname" type="text" v-model.trim="player.nickname" placeholder="Enter your nickname">
    <button type="submit">YAY JOIN</button>
  </form>
</template>

<script>
import axios from 'axios'
import {io} from 'socket.io-client'

export default {
  name: "JoinRoom",
  data (){
    return {
      player: {},
      socket: io('http://localhost:4000', { transports : ['websocket'] })
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.player.room = this.$route.params.id
      this.player.message = this.player.nickname + ' joined the room'
      axios.post(`http://localhost:8081/api/player`, this.player)
          .then(res => {
            this.socket.emit('save-message', {
              room: this.player.room,
              nickname: this.player.nickname,
              message: 'Join this room'
            });
            this.$router.push({
              name: 'Room',
              params: {id: this.$route.params.id, nickname: res.data.nickname}
            })
            console.log(res)
            console.log(res.data)
            this.socket.emit('join-room', this.player)
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