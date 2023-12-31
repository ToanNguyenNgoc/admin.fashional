export const RAccount = {
    GET: 'v1/accounts.GET',
    GET_ID: 'v1/accounts/:id.GET',
    POST: 'v1/accounts.POST',
    PUT: 'v1/accounts/:id.PUT',
    DELETE: 'v1/accounts/:id.DELETE'
}
export const RRole = {
    GET: 'v1/roles.GET',
    GET_ID: 'v1/roles/:id.GET',
    POST: 'v1/roles.POST',
    PUT: 'v1/roles/:id.PUT',
    DELETE: 'v1/roles/:id.DELETE'
}
export const RPermission = {
    GET: 'v1/permissions.GET',
    POST: 'v1/permissions.POST',
}
export const RBranch = {
    GET: 'v1/banners.GET',
    GET_ID: 'v1/banners/:id.GET',
    POST: 'v1/banners.POST',
    PUT: 'v1/banners/:id.PUT',
    DELETE: 'v1/banners/:id.DELETE'
}
export const RTag = {
    GET: 'v1/tags.GET',
    GET_ID: 'v1/tags/:id.GET',
    POST: 'v1/tags.POST',
    PUT: 'v1/tags/:id.PUT',
    DELETE: 'v1/tags/:id.DELETE'
}
export const RCategory = {
    GET: 'v1/categories.GET',
    GET_ID: 'v1/categories/:id.GET',
    POST: 'v1/categories.POST',
    PUT: 'v1/categories/:id.PUT',
    DELETE: 'v1/categories/:id.DELETE'
}
export const RProduct = {
    GET: 'v1/products.GET',
    GET_ID: 'v1/products/:id.GET',
    POST: 'v1/products.POST',
    PUT: 'v1/products/:id.PUT',
    DELETE: 'v1/products/:id.DELETE',

    PUT_BRANCH: 'v1/products/:id/branches/:child_id.PUT',
    POST_BRANCH: 'v1/products/:id/branches/.POST',
    DELETE_BRANCH: 'v1/products/:id/branches/:child_id.DELETE',

    PUT_SIZE: 'v1/products/:id/sizes/:child_id.PUT',
    POST_SIZE: 'v1/products/:id/sizes/.POST',
    DELETE_SIZE: 'v1/products/:id/sizes/:child_id.DELETE'
}
export const ROrder = {
    GET: 'v1/orders.GET',
    GET_ID: 'v1/orders/:id.GET',
    POST: 'v1/orders.POST',
    PUT: 'v1/orders/:id.PUT',
    DELETE: 'v1/orders/:id.DELETE'
}