import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [{
      path: '/:bookName/:pageName',
      name: 'Pages',
      component: () => import('../views/Pages.vue'),
    }, {
      path: '/',
      name: 'Home',
      component: Home,
    }]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
