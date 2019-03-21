import Vue from 'vue'
import Router from 'vue-router'

/** 页面 */
import login from '../pages/common/login'
import home from '../pages/home'
import index from '../pages/user/index'
import audit from '../pages/user/audit'
import server from '../pages/user/server'

Vue.use(Router)

const router = new Router({
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
      component: home,
      children: [
         {
            path: '/home',
            name: 'index',
            component: index
         },
         {
            path: '/audit',
            name: 'audit',
            component: audit
         },
         {
            path: '/server',
            name: 'server',
            component: server
         }      
      ]
    },
    {
      path: '/*',
      name: 'login',
      component: login
   }
  ]
})
router.beforeEach((to, from, next) => {
   let token = localStorage.getItem('adminToken');
   if(!token && to.name !== 'login'){
      next({
         path: '/'
       })
       return;
   }
   next();
 });
 export default router;