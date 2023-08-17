import { District, Province, ResponseList, Ward } from "app/models"
import { axiosConfig } from "configs"

export const _province = {
    findProvinces: () => axiosConfig
        .get('/v1/provinces')
        .then<ResponseList<Province[]>>(res => res.data),
    findDistricts: (province_code: number | string) => axiosConfig
        .get(`/v1/provinces/${province_code}/districts`)
        .then<ResponseList<District[]>>(res => res.data),
    findWards: (district_code: number | string) => axiosConfig
        .get(`/v1/districts/${district_code}/wards`)
        .then<ResponseList<Ward[]>>(res => res.data)
}