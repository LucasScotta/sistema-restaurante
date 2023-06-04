import { Rol } from "./User"

export interface UserCreationDTO {
    username?: string
    password?: string
    rol?: Rol
}