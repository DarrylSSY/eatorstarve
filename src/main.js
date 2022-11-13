import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/main.scss";
import "bootstrap";
import App from "./App";
import router from "./router";
import { createPinia } from "pinia";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import "v-calendar/dist/style.css";
import VCalendar from "v-calendar";

library.add(fas);
library.add(far);
library.add(fab);
const pinia = createPinia();
createApp(App)
  .use(router)
  .use(pinia)
  .use(VCalendar, {})
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");

// function to create a random room code
// let pin = Math.random().toString(36).slice(9)
