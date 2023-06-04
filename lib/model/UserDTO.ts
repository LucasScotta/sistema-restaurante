import { Rol } from "./User"

export interface UserDTO {
    name?: string
    password?: string
    rol?: Rol
}