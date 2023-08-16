import { Account, AccountBody, QrAccount, ResponseDetail, ResponseList } from "app/models"
import { axiosConfig } from "configs"

export const _account = {
    findAll: (qr: QrAccount) => {
        return axiosConfig.get('/v1/accounts', { params: qr }).then<ResponseList<Account[]>>(res => res.data)
    },
    findById: (id: number | string) => {
        return axiosConfig.get(`/v1/accounts/${id}`).then<ResponseDetail<Account>>(res => res.data)
    },
    create: (body: AccountBody) => {
        return axiosConfig.post('/v1/accounts', body).then(res => res.data)
    },
    update:(id:number|string, body:AccountBody)=>{
        return axiosConfig.put(`/v1/accounts/${id}`, body).then(res => res.data)
    },
    delete:(id:number|string) => axiosConfig.delete(`/v1/accounts/${id}`).then(res => res.data)
}