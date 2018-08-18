import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = false;

// Google Authentiaction setup
import GAuth from "./assets/gauth";

Vue.use(GAuth, {
  clientId: "108245923385-0qfhn53m6b0890gothghoasld86vq1gc.apps.googleusercontent.com"
  // , scope: "profile email https://www.googleapis.com/auth/plus.login"
});

import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');