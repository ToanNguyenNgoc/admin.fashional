import { Product, ProductBody, ProductBranch, ProductMedia, QrProduct, ResponseDetail, ResponseList } from "app/models";
import { axiosConfig } from "configs";

export const _product = {
  findAll: (qr: QrProduct) => axiosConfig
    .get('/v1/products', { params: qr }).then<ResponseList<Product[]>>(res => res.data),
  findById: (id: number | string) => axiosConfig
    .get(`/v1/products/${id}`, {
      params: { "includes": "created_by|category|sizes" }
    })
    .then<ResponseDetail<Product>>(res => res.data),
  create: (body: ProductBody) => axiosConfig
    .post('/v1/products', body)
    .then<ResponseDetail<Product>>(res => res.data),
  update: (id: number | string, body: ProductBody) => axiosConfig
    .put(`/v1/products/${id}`, body)
    .then<ResponseDetail<Product>>(res => res.data),

  findMedias: (product_id: number | string) => axiosConfig
    .get(`/v1/products/${product_id}/medias`)
    .then<ResponseList<ProductMedia[]>>(res => res.data),

  createProductMedias: (product_id: number | string, body: { media_ids: number[] }) => axiosConfig
    .post(`/v1/products/${product_id}/medias`, body),
  deleteProductMedias: (product_id: number | string, body: { media_ids: number[] }) => axiosConfig
    .delete(`/v1/products/${product_id}/medias`, { data: body }),

  findBranches: (product_id: number | string) => axiosConfig
    .get(`/v1/products/${product_id}/branches`)
    .then<ResponseList<ProductBranch[]>>(res => res.data),
  createBranch: (product_id: number | string, body: { branch_id: number | string, quantity: number }) => axiosConfig
    .post(`/v1/products/${product_id}/branches`, body),
  updateBranch: (product_id: number | string, child_id: number | string, body: { quantity?: number, status?: boolean }) => axiosConfig
    .put(`/v1/products/${product_id}/branches/${child_id}`, body),
  deleteBranch: (product_id: number | string, child_id: number | string) => axiosConfig
    .delete(`/v1/products/${product_id}/branches/${child_id}`)
}