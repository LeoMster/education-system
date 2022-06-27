import axios from 'axios'

export interface UserLoginParams {
  type: number
  id: string
  pwd: string
}

interface SaveAndSubmitParams {
  type: number
  id: string
  list: Array<string>
}

/** 登录 */
export const userLogin = (params: UserLoginParams) => axios.post(`/api/student/login`, {...params})
/** 学生信息 */
export const getStudentMsg = (id: string) => axios.get(`/api/student/stuhome?id=${id}`)
/** 培养计划是否已经提交 */
export const getIsSubmit = (id: string) => axios.get(`/api/student/planDesignISFlag?id=${id}`)
/** 课程列表 */
export const getStudentCourseList = (id: string) => axios.get(`/api/student/searchSubmitedCourse?id=${id}`)
/** 培养计划保存和提交 */
export const planDesignSaveAndSubmit = (params: SaveAndSubmitParams) => axios.post(`/api/student/studentPlanDesign`, {...params}) 
/** 已提交培养计划查询 */
export const planDesignSearch = (id: string) => axios.get(`/api/student/searchPlanCourse?id=${id}`)
/** 学生选课是否已经提交 */
export const getCourseIsSumbit = (id: string) => axios.get(`/api/student/selectCourseResult?id=${id}`)
/** 选课课程列表 */
export const getCourseList = (id: string) => axios.get(`/api/student/selectCourseResult?id=${id}`)
/** 学生选课保存和提交 */
export const planDesignCourseSaveAndSubmit = (params: SaveAndSubmitParams) => axios.post(`/api/student/studentCourseDesign`, {...params}) 
/** 成绩查询 */
export const getCourseScoreList = (id: string) => axios.get(`/api/student/courseScore?id=${id}`)