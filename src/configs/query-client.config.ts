import { QueryClient } from "react-query"


export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            cacheTime: 3600 * 10,
            //   onError(err) {
            //     const error = err as AxiosError
            //     Sentry.captureException(`${error.config?.url}?${queryString.stringify(error.config?.params)}`, {
            //       level: 'error'
            //     })
            //   },
        }
    }
})
export const STALE_TIME = 60 * 60 * (60 * 1000)

export const QR_KEY = {
    account: 'account',
    role: 'role',
    permission: 'permission',
    branch: 'branch',
    tag:'tag',
    category:'category',
    product:'product',
    product_media:'product_media',
    product_branch:'product_branch',
    product_size:'product_size'
}