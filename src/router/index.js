import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
const LogInRegister = () => import('@//views/LogInRegister.vue')


let routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login-register',
    name: 'LogInRegister',
    component: LogInRegister,
    meta: {
      guest: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Meta Handling
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('token') == null) {
            next({
                path: '/login-register',
                params: { nextUrl: to.fullPath }
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('token') == null) {
            next()
        }
    } else {
        next()
    }
})

export default router