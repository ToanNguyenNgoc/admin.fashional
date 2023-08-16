import { Branch, BranchBody, QrBranch, ResponseDetail, ResponseList } from "app/models"
import { axiosConfig } from "configs"

export const _branch = {
  findAll: (qr: QrBranch) => {
    return axiosConfig.get('/v1/branches', { params: qr }).then<ResponseList<Branch[]>>(res => res.data)
  },
  findById: (id: number | string) => {
    return axiosConfig.get(`/v1/branches/${id}`).then<ResponseDetail<Branch>>(res => res.data)
  },
  update: (id: number | string, body: BranchBody) => {
    return axiosConfig.put(`/v1/branches/${id}`, body).then(res => res.data)
  }
}