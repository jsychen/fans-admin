import Vue from 'vue'
import Router from 'vue-router'

/** 页面 */
import login from '../pages/login'
import register from '../pages/register'
import home from '../pages/index'


Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'current',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
       path: '/home',
       name: 'home',
       component: home
    }
  ]
})
