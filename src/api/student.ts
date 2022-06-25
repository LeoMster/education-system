import axios from 'axios'

export interface UserLoginParams {
  type: number
  id: string
  pwd: string
}

/** 登录 */
export const userLogin = (params: UserLoginParams) => axios.post(`/api/student/login`, {...params})
/** 学生信息 */
export const getStudentMsg = (id: string) => axios.get(`/api/student/stuhome?id=${id}`)
/** 课程列表 */
export const getStudentCourseList = () => axios.get(`/api/student/courseMsg`)
/** 成绩查询 */
export const getCourseScoreList = (id: string) => axios.get(`/api/student/courseScore?id=${id}`)