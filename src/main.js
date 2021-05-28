import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Notifications from 'vue-notification'
import "./plugins";
import "./assets/style.css"
import mixinTitle from './mixin/title.js';

Vue.mixin(mixinTitle);

Vue.use(Notifications)


new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
