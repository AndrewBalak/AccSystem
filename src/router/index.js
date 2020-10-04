import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AccountList',
    meta: { layout: 'main' },
    component: () => import('../views/AccountList')
  },
  {
    path: '/account/:id',
    name: 'Account',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Account'),
    props: true
  },
  {
    path: '/auth',
    name: 'Auth',
    meta: { layout: 'empty' },
    component: () => import('../views/Auth')
  },
  {
    path: '*',
    name: 'NotFound',
    meta: { layout: 'empty' },
    component: () => import('../views/NotFound')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
