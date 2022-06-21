import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import StudentView from '@/views/Student/StudentView.vue'
import studentRoutes from './student'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      name: '登录',
      component: LoginView
    },
    {
      path: '/student',
      redirect: '/student/info',
      name: '学生',
      component: StudentView,
      children: [ ...studentRoutes ]
    }
  ]
})

export default router
