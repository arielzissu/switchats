import Vue from 'vue'
import VueRouter from 'vue-router'
import Loading from '../views/Loading.vue'
import Home from '../views/Home.vue'
import Chat from '../views/Chat.vue'
import Ads from '../views/Ads.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Loading',
    component: Loading
  },
  {
    path: '/signin',
    name: 'Home',
    component: Home
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/ads',
    name: 'Ads',
    component: Ads,
    meta: {
      requiresAuth: true
    }
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.nickname && store.state.nickname.length > 0) {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }

  if (to.name === 'Home') {
    store.commit('setStep', 0)
  }
})

export default router
