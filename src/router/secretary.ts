import SecretaryClassManage from '@/views/secretary/SecretaryClassManage.vue'
import SecretaryCourseManage from '@/views/secretary/SecretaryCourseManage.vue'
import SecretaryProfessional from '@/views/secretary/SecretaryProfessional.vue'
import SecretaryAcademic from '@/views/secretary/SecretaryAcademic.vue'
import { School, Reading } from '@element-plus/icons-vue'

export default [
  {
    path: '/secretary/class-manage',
    redirect: '/secretary/class-manage/professional',
    name: '班级管理',
    component: SecretaryClassManage,
    icon: School,
    children: [
      {
        path: '/secretary/class-manage/professional',
        name: '专硕',
        component: SecretaryProfessional,
        icon: null
      },
      {
        path: '/secretary/class-manage/academic',
        name: '学硕',
        component: SecretaryAcademic,
        icon: null
      }
    ]
  },
  {
    path: '/secretary/course-manage',
    name: '课程管理',
    component: SecretaryCourseManage,
    icon: Reading
  }
]

