

import Vue from 'vue'
import PrintApp from './PrintApp'
import router from './router/print.index'
import store from './store'

import './assets/css/style.css'
// 引入sass
import './assets/scss/style.scss'

new Vue({
  el: '#print',
  router,
  store,
  components: { PrintApp },
  template: '<PrintApp/>'
});
