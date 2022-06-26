import TeacherView from '@/views/teacher/TeacherView.vue'
import { EditPen } from '@element-plus/icons-vue'

export default [
  {
    path: '/teacher',
    name: '课程管理',
    component: TeacherView,
    icon: EditPen
  }
]