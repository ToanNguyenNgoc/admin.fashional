export const PBranch = {
    index: '/pages/branches',
    create: '/pages/branches-form',
    update: '/pages/branches-form/:id',
    update_id: (id: number | string) => `/pages/branches-form/${id}`
}
export const PTag = {
    index: '/pages/tags'
}
export const PCategory = {
    index: '/pages/categories',
    create: '/pages/categories-form',
    update: '/pages/categories-form/:id',
    update_id: (id: number | string) => `/pages/categories-form/${id}`
}
export const PProduct = {
    index: '/pages/products',
    create: '/pages/products-form',
    update: '/pages/products-form/:id',
    update_id: (id: number | string) => `/pages/products-form/${id}`
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
export const POrder = {
    index: '/pages/orders',
    create: '/pages/orders-form',
    update: '/pages/orders-form/:id',
    update_id: (id: number | string) => `/pages/orders-form/${id}`
}