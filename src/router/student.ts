import StudentInfo from '@/views/student/StudentInfo.vue'
import StudentPlanDesign from '@/views/student/StudentPlanDesign.vue'
import StudentPlanSearch from '@/views/student/StudentPlanSearch.vue'
import StudentCourseSelect from '@/views/student/StudentCourseSelect.vue'
import StudentScoreQuery from '@/views/student/StudentScoreQuery.vue'

export default [
  {
    path: '/student/info',
    name: '个人信息',
    component: StudentInfo
  },
  {
    path: '/student/plan-design',
    name: '培养计划制定',
    component: StudentPlanDesign
  },
  {
    path: '/student/plan-search',
    name: '培养计划查询',
    component: StudentPlanSearch
  },
  {
    path: '/student/course-select',
    name: '学生网上选课',
    component: StudentCourseSelect
  },
  {
    path: '/student/score-query',
    name: '课程成绩查询',
    component: StudentScoreQuery
  }
]