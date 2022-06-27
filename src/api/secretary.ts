import axios from 'axios'

/** 查看学生信息 */
export const getStudentMsgList = (id: number) => axios.get(`/api/secretary/getStudentMsg?id=${id}`)
/** 点击查看选课信息 */
export const checkCourseList = (id: string) => axios.get(`/api/secretary/getStudentCourseScore?id=${id}`)
/** 课程管理获取课程列表 */
export const getCourseList = () => axios.get(`/api/secretary/getCourseMsg`)
/** 查看选课学生 */
export const getStudentList = (id: string) => axios.get(`/api/secretary/getCourseStudentMsg?id=${id}`)
/** 删除课程 */
export const deleteCourse = (id: string) => axios.get(`/api/secretary/deleteCourse?id=${id}`)