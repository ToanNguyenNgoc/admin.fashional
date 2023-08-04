import { Account, QrAccount, ResponseDetail, ResponseList } from "app/models"
import { axiosConfig } from "configs"

export const _account = {
    findAll: (qr: QrAccount) => {
        return axiosConfig.get('/v1/accounts', { params: qr }).then<ResponseList<Account[]>>(res => res.data)
    },
    findById: (id: number | string) => {
        return axiosConfig.get(`/v1/accounts/${id}`).then<ResponseDetail<Account>>(res => res.data)
    }
}