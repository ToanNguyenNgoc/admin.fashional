import { Media, ResponseDetail } from "app/models"
import { axiosConfig } from "configs"

export const _media = {
  create: (form: FormData) => {
    return axiosConfig
      .post('/v1/upload/media', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then<ResponseDetail<Media>>(res => res.data)
  }
}