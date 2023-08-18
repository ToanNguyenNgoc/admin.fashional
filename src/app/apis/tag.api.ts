import { ResponseList, Tag, QrTag, TagBody, ResponseDetail } from "app/models";
import { axiosConfig } from "configs";

export const _tag = {
    findAll: (qr: QrTag) => axiosConfig.get('/v1/tags', { params: qr }).then<ResponseList<Tag[]>>(res => res.data),
    update: (id: number, body: TagBody) => axiosConfig.put(`/v1/tags/${id}`, body).then<ResponseDetail<Tag>>(res => res.data),
    create: (body: TagBody) => axiosConfig.post(`/v1/tags`, body).then<ResponseDetail<Tag>>(res => res.data),
    delete: (id: number) => axiosConfig.delete(`/v1/tags/${id}`).then(res => res.data)
}