import { Rol } from "./User"

export interface UserActionsDTO {
    id?: number
    username?: string
    password?: string
    rol?: Rol
}