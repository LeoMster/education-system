import StudentInfo from '@/views/Student/StudentInfo.vue'
import StudentPlanDesign from '@/views/Student/StudentPlanDesign.vue'
import StudentPlanSearch from '@/views/Student/StudentPlanSearch.vue'
import StudentCourseSelect from '@/views/Student/StudentCourseSelect.vue'
import StudentScoreQuery from '@/views/Student/StudentScoreQuery.vue'

export default [
  {
    path: '/student/info',
    name: '个人信息',
    component: StudentInfo
  },
  {
    path: '/student/design-plan',
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