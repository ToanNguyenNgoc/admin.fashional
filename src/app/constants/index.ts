const ACCESS_TOKEN = "accessToken"
const TOKEN_EXPERTED_AT = "token_expired_at"
const CODE_SPA = process.env.REACT_APP_API_CODE_SPA || ''

export {
    ACCESS_TOKEN,
    TOKEN_EXPERTED_AT,
    CODE_SPA
}
export * from "./role"
export * from "./page"