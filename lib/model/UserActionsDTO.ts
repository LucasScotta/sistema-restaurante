import { Rol } from "./Rol"

export interface UserActionsDTO {
    id?: number
    username?: string
    password?: string
    rol?: Rol
}
