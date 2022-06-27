import axios from 'axios'

/** 查看学生信息 */
export const getStudentMsgList = (id: number) => axios.get(`/api/secretary/getStudentMsg?id=${id}`)
/** 点击查看选课信息 */
export const checkCourseList = (id: string) => axios.get(`/api/secretary/getStudentCourseScore?id=${id}`)