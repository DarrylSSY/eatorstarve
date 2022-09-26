import { createApp } from 'vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/main.scss"
import "bootstrap"
import App from './App'
import router from './router'

createApp(App).use(router).mount('#app')

// function to create a random room code
// let pin = Math.random().toString(36).slice(9)