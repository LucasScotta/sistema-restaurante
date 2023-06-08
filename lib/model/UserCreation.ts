import { Rol } from "./Rol"

export interface UserCreation {
    username: string
    password: string
    rol?: Rol
}
