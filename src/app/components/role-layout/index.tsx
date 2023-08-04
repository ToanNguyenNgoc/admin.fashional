import { CODE_SPA } from "app/constants";
import { useAuth } from "app/modules/auth";
import { FC, Fragment, ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface RoleLayoutProps {
    children: ReactElement,
    permissionPath: string,
    isNavigate?: boolean
}

export const RoleLayout: FC<RoleLayoutProps> = ({
    children,
    permissionPath,
    isNavigate = false
}) => {
    const { roles } = useAuth()
    const roles_code = roles.map(i => i.role.code)
    const permissions = roles.flatMap(i => i.role.permissions).map(i => i.permission)
    if (roles_code.includes(CODE_SPA) || (permissions.map(i => i.path).includes(permissionPath))) {
        return (
            <Fragment>{children}</Fragment>
        )
    }
    return (isNavigate ? <Navigate to="/error/403" /> : <></>);
}