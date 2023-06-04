export type Rol = 'admin' | 'chef' | 'waiter'

export interface User {
    id: number
    username: string
    password: string
    rol: Rol
}