import { ResponseDetail, ResponseList, Role, RoleBody } from "app/models"
import { axiosConfig } from "configs"

export const _role = {
    findAll: () => {
        return axiosConfig.get('/v1/roles').then<ResponseList<Role[]>>(res => res.data)
    },
    findById: (id: number | string) => {
        return axiosConfig.get(`/v1/roles/${id}`).then<ResponseDetail<Role>>(res => res.data)
    },
    create: (body: RoleBody) => {
        return axiosConfig.post('/v1/roles', body)
    },
    update: (id: number | string, body: RoleBody) => {
        return axiosConfig.put(`/v1/roles/${id}`, body)
    }
}