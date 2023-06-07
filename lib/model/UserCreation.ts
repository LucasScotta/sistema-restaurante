import { Rol } from "./User"

export interface UserCreation {
    username: string
    password: string
    rol?: Rol
}
