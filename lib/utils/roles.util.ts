import { Admin, Chef, Rol, Waiter } from "../model";
interface Roles {
    ADMIN: Admin,
    CHEFF: Chef,
    WAITER: Waiter
}
export const roles: Roles = {
    ADMIN: 'admin',
    CHEFF: 'chef',
    WAITER: 'waiter',
}
