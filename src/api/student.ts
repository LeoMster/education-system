import axios from 'axios'

export interface UserLoginParams {
  type: number
  id: string
  pwd: string
}

/** 登录 */
export const userLogin = (params: UserLoginParams) => axios.post('/api/student/login', {...params})
