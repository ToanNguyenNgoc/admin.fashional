import { CODE_SPA } from "app/constants"
import { useAuth } from "app/modules/auth"

export const usePermission = (permissionPath: string) => {
    let resolve = false
    const { roles } = useAuth()
    const roles_code = roles.map(i => i.role.code)
    const permissions = roles.flatMap(i => i.role.permissions).map(i => i.permission)
    if (roles_code.includes(CODE_SPA) || (permissions.map(i => i.path).includes(permissionPath))) {
        resolve = true
    }
    return {
        resolve
    }
}