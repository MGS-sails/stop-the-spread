import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/user-chat',
    name: 'UserChat',
    meta: {
      usesSideNav: true
    },
    component: () => import(/* webpackChunkName: "user-chat" */ '../views/UserChat.vue')
  },
  {
    path: '/medic-chat',
    name: 'MedicChat',
    meta: {
      usesSideNav: true
    },
    component: () => import(/* webpackChunkName: "medic-chat" */ '../views/MedicChat')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/user/chat',
    name: 'User-Chat',
    component: () => import(/*webpackChunkName: "user-chat" */ '../views/UserChat.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
