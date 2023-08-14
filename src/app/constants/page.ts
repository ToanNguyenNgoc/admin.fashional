export const PBranch = {
    index: '/pages/branches'
}
export const PTag = {
    index: '/pages/tags'
}
export const PCategory = {
    index: '/pages/categories'
}
export const PProduct = {
    index: '/pages/products'
}
export const PAccount = {
    index: '/pages/accounts',
    create: '/pages/accounts-form',
    update: '/pages/accounts-form/:id',
    update_id: (id: number | string) => `/pages/accounts-form/${id}`
}
export const PRole = {
    index: '/pages/roles',
    create: '/pages/roles-form',
    update: '/pages/roles-form/:id',
    update_id: (id: number | string) => `/pages/roles-form/${id}`
}