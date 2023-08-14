import { Permission, ResponseList } from "app/models";
import { axiosConfig } from "configs";

export const _permission = {
  findAll: () => axiosConfig.get('/v1/permissions').then<ResponseList<Permission[]>>(res => res.data)
}