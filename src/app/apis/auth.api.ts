// import { axiosConfig } from "../../configs"

import { ResponseDetail, User } from "app/models"
import { axiosConfig } from "configs"

export const _auth = {
  login: (email: string, password: string) => {
    return axiosConfig.post('/v1/auth/login', { email, password }).then<ResponseDetail<User>>(res => res.data)
  },
  profile: () => {
    return axiosConfig.get('/v1/auth/profile', {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibWFuYWdlciI6dHJ1ZSwiaWF0IjoxNjkxMDQzMDAyLCJleHAiOjE2OTE5MDcwMDJ9.p9nxnEc5RpFtYtp0a9WdzVcxUSqKENp8Fk1tXWk4DpU"
      }
    })
  }
}