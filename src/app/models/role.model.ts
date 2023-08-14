export interface UserRole {
    accountId: number;
    roleId: number;
    created_at: string;
    role: Role
}

export interface Role {
    id: number;
    name: string;
    status: boolean;
    deleted: boolean;
    updated_at: string;
    created_at: string;
    code: string;
    permissions: Array<{
        permission: Permission
    }>
}
export interface Permission {
    created_at: string;
    id: number;
    name: string;
    path: string;
    updated_at: string
}
export interface RoleBody {
    name?: string;
    status?: boolean;
    permissions?: number[]
}