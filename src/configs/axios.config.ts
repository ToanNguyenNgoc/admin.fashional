import { ACCESS_TOKEN } from 'app/constants'
import axios from 'axios'
import Cookies from 'js-cookie'
import queryString from 'query-string'

// export const baseURL = process.env.REACT_APP_API_URL_DEV;
export const baseURL = process.env.REACT_APP_API_ORIGIN_URL
export const axiosConfig = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
})
axiosConfig.interceptors.request.use(async (config) => {
    const accessToken = Cookies.get(ACCESS_TOKEN)
    config = {
        ...config,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }
    return config
})
axios.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data
        }
        return response
    },
    (error) => {
        throw error
    }
)
