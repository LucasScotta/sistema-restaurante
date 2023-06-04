export type Rol = 'admin' | 'chef' | 'weiter'

export interface User {
    id: number
    name: string
    password: string
    rol: Rol
}