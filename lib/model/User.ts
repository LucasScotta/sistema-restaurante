import { Rol } from "./Rol"

export interface User {
    id: number
    username: string
    password: string
    rol: Rol
}
