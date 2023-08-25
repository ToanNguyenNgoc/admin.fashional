import { Order, QrOrder, ResponseDetail, ResponseList } from "app/models";
import { axiosConfig } from "configs";

export const _order = {
  findAll: (qr: QrOrder) => axiosConfig.get('/v1/orders', { params: qr }).then<ResponseList<Order[]>>(res => res.data),
  findById: (id: number | string) => axiosConfig.get(`/v1/orders/${id}`).then<ResponseDetail<Order>>(res => res.data)
}