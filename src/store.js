import Vue from 'vue'
import Vuex from 'vuex'

import AUTH from './stores/authStore';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    AUTH
  }
})