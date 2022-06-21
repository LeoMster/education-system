import StudentInfo from '@/views/Student/StudentInfo.vue'
import StudentDesignPlan from '@/views/Student/StudentDesignPlan.vue'

export default [
  {
    path: '/student/info',
    name: '个人信息',
    component: StudentInfo,
  },
  {
    path: '/student/design-plan',
    name: '培养计划制定',
    component: StudentDesignPlan,
  },
  // {
  //   path: '/student/search-plan',
  //   name: 'StudentSearchPlan',
  //   component: null,
  // },
  // {
  //   path: '/student/select-course',
  //   name: 'StudentSelectCourse',
  //   component: null,
  // },
  // {
  //   path: '/student/query-score',
  //   name: 'StudentQueryScore',
  //   component: null,
  // },
]