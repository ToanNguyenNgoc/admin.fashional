import { Category, CategoryBody, QrTag, ResponseDetail, ResponseList } from "app/models";
import { axiosConfig } from "configs";

export const _category = {
    findAll: (qr: QrTag) => axiosConfig.get('/v1/categories', { params: qr }).then<ResponseList<Category[]>>(res => res.data),
    findById: (id: number | string) => axiosConfig.get(`/v1/categories/${id}`).then<ResponseDetail<Category>>(res => res.data),
    create: (body: CategoryBody) => axiosConfig.post('/v1/categories', body).then<ResponseDetail<Category>>(res => res.data),
    update: (id: number | string, body: CategoryBody) => axiosConfig
        .put(`/v1/categories/${id}`, body)
        .then<ResponseDetail<Category>>(res => res.data),
    delete: (id: number | string) => axiosConfig.delete(`/v1/categories/${id}`)
}