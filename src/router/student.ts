import StudentInfo from '@/views/student/StudentInfo.vue'
import StudentPlanDesign from '@/views/student/StudentPlanDesign.vue'
import StudentPlanSearch from '@/views/student/StudentPlanSearch.vue'
import StudentCourseSelect from '@/views/student/StudentCourseSelect.vue'
import StudentScoreQuery from '@/views/student/StudentScoreQuery.vue'
import { UserFilled, Paperclip, Tickets, Search, Plus } from '@element-plus/icons-vue'

export default [
  {
    path: '/student/info',
    name: '个人信息',
    component: StudentInfo,
    icon: UserFilled
  },
  {
    path: '/student/plan-design',
    name: '培养计划制定',
    component: StudentPlanDesign,
    icon: Paperclip
  },
  {
    path: '/student/plan-search',
    name: '培养计划查询',
    component: StudentPlanSearch,
    icon: Search
  },
  {
    path: '/student/course-select',
    name: '学生网上选课',
    component: StudentCourseSelect,
    icon: Plus
  },
  {
    path: '/student/score-query',
    name: '课程成绩查询',
    component: StudentScoreQuery,
    icon: Tickets
  }
]