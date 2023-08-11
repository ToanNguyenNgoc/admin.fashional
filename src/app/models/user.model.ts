import { Page } from "./page.model";
import { Role } from "./role.model";

export interface User {
    accessToken: string;
    token_expired_at:string;
    created_at: string;
    deleted: boolean;
    email: string;
    fullname: string;
    id: string;
    manager: boolean;
    status: boolean;
    telephone: string;
    updated_at: string;
    avatar:string|null;
    address:string|null
}
export interface Account extends User {
    roles: Array<{
        role: Role
    }>
}
export interface QrAccount extends Page {
    'search'?: string;
    'status'?: boolean;
    'manager'?: boolean;
    'created_at'?: string;
    'includes'?: 'roles' | ''
}