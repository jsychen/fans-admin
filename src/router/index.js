import Vue from 'vue'
import Router from 'vue-router'

/** 页面 */
import login from '../pages/common/login'
import register from '../pages/common/register'
import home from '../pages/common/home'

import customized from '../pages/tenant/customized'
import platformPrice from '../pages/tenant/platformPrice'
import account from '../pages/tenant/account'
import result from '../pages/tenant/result'

import plan from '../pages/plan'
import addPlan from '../pages/plan/add'
import updatePlan from '../pages/plan/update'
import usePlan from '../pages/plan/use'


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
      path: '/',
      name: 'home',
      component: home,
      children: [
        {
          path: '/home',
          name: 'customized',
          component: customized
        },
        {
          path: '/home/result',
          name: 'result',
          component: result
        },
        {
          path: '/plan',
          name: 'plan',
          component: plan,
        },
        {
          path: '/plan/add',
          name: 'addPlan',
          component: addPlan
        },
        {
            path: '/plan/update',
            name: 'updatePlan',
            component: updatePlan
         },
         {
            path: '/plan/use',
            name: 'usePlan',
            component: usePlan
         },
        {
          path: '/platformPrice',
          name: 'platformPrice',
          component: platformPrice
        },
        {
          path: '/account',
          name: 'account',
          component: account
        }
      ]
    }
  ]
})
