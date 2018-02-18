import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import config from './config.js'

axios.defaults.baseURL = config.api

new Vue({
  el: '#app',
  render: h => h(App)
})
