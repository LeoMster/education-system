import axios from 'axios'

interface SubmitParams {
  teacherId: string
  list: Array<{
    studentId: string
    score: number
  }>
}

/** 是否已经提交 */
export const getIsSubmit = (id: string) => axios.get(`/api/teacher/submitScoreFlag?id=${id}`)
/** 获取列表 */
export const getStudentScoreList = (id: string) => axios.get(`/api/teacher/getStudentScore?id=${id}`)
/** 提交操作 */
export const submitScoures = (params: SubmitParams) => axios.post(`/api/teacher/submitStudentScore`, {...params})