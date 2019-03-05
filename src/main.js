// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import store from 'storejs'

Vue.use(iView)

import 'iview/dist/styles/iview.css'
import './assets/css/common.css'
import './assets/css/font.css'


Vue.config.productionTip = false

Vue.prototype.$store = store


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
