import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import studentRoutes from './student'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      name: 'Login',
      component: LoginView 
    },
    ...studentRoutes,
  ]
})

export default router
