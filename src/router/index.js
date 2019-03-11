import Vue from 'vue'
import Router from 'vue-router'

/** 页面 */
import login from '../pages/login'
import home from '../pages/index'
import audit from '../pages/audit'


Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
       path: '/home',
       name: 'home',
       component: home
    },
    {
      path: '/audit',
      name: 'audit',
      component: audit
   }
  ]
})
