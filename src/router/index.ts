import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import StudentView from '@/views/student/StudentView.vue'
import TeacherView from '@/views/teacher/TeacherView.vue'
import SecretaryView from '@/views/secretary/SecretaryView.vue'
import studentRoutes from './student'
import teacherRoutes from './teacher'
import secretaryRoutes from './secretary'

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
    },
    {
      path: '/teacher',
      redirect: '/teacher/course-manage',
      name: '教师',
      component: TeacherView,
      children: [...teacherRoutes]
    },
    {
      path: '/secretary',
      redirect: '/secretary/class-manage',
      name: '教秘',
      component: SecretaryView,
      children: [...secretaryRoutes]
    }
  ]
})

export default router
