// import { axiosConfig } from "../../configs"

import { BodyForgot, ResponseDetail, ResponseList, User, UserRole } from "app/models"
import { axiosConfig } from "configs"

export const _auth = {
  login: (email: string, password: string) => {
    return axiosConfig.post('/v1/auth/login', { email, password }).then<ResponseDetail<User>>(res => res.data)
  },
  profile: () => {
    return axiosConfig.get('/v1/auth/profile').then<ResponseDetail<User>>(res => res.data)
  },
  forgot: (body: BodyForgot) => {
    return axiosConfig.post('/v1/auth/forgot', body).then(res => res.data)
  },
  roles: () => {
    return axiosConfig.get('/v1/auth/roles', { params: { 'includes': 'permissions' } })
      .then<ResponseList<UserRole[]>>(res => res.data)
  },
  logout: () => axiosConfig.post('/v1/auth/logout')
}