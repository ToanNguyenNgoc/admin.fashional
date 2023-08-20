import { ACCESS_TOKEN, TOKEN_EXPERTED_AT } from 'app/constants'
import axios from 'axios'
import Cookies from 'js-cookie'
import queryString from 'query-string'

// export const baseURL = process.env.REACT_APP_API_DEV_URL;
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
    const { refresh, token } = validRefreshToken()
    if (refresh && token) {
        const response = await axios.post(`${baseURL}/v1/auth/refresh`, {}, { withCredentials: true })
        Cookies.set(ACCESS_TOKEN, response.data.context.accessToken, {
            secure: true
        })
        Cookies.set(TOKEN_EXPERTED_AT, response.data.context.token_expired_at, {
            secure: true
        })
        config = {
            ...config,
            headers: {
                'Authorization': `Bearer ${response.data.context.accessToken}`
            }
        }
    }
    return config
})
const validRefreshToken = () => {
    let refresh = false
    const dateString = Cookies.get(TOKEN_EXPERTED_AT)
    const token = Cookies.get(ACCESS_TOKEN)
    if (dateString) {
        const date = new Date()
        const dateObject = new Date(dateString);
        const milliseconds = dateObject.getTime();
        const timeCur = date.getTime()
        if ((timeCur > milliseconds)) {
            refresh = true
        }
    }
    return { refresh, token }
}