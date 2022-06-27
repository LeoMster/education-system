import axios from 'axios'

export const getStudentMsgList = (id: number) => axios.get(`/api/secretary/getStudentMsg?id=${id}`)