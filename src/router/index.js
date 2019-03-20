import Vue from 'vue'
import Router from 'vue-router'

/** 页面 */
import login from '../pages/login'
import home from '../pages/home'
import index from '../pages/index'
import audit from '../pages/audit'
import servers from '../pages/servers'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
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
            path: '/servers',
            name: 'servers',
            component: servers
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
         path: '/login'
       })
       return;
   }
   next();
 });
 export default router;