import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/oauth2/signin/line',
    name: 'LineCooperation',
    component: () => import(/* webpackChunkName: "about" */ '@/views/LineCooperation.vue')
  },
  {
    path: '/product',
    name: 'Exhibition',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Exhibition.vue')
  },
  {
    path: '/product/:id',
    name: 'Exhibition',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Exhibition.vue')
  },
  {
    path: '/product/edit/:id',
    name: 'EditExhibition',
    component: () => import(/* webpackChunkName: "about" */ '@/views/EditExhibition.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
