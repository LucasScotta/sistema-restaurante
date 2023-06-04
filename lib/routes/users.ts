import { User, Rol } from "../model"

let id = 1
export const users: User[] = [{ id: 0, name: 'dunfu', password: 'as', rol: 'admin' }]

export function setNewUser(name: string, password: string, rol: Rol = 'weiter') {
    const user = { id, name, password, rol }
    users.push(user)
    id += 1
}

export function getUser(name: string, password: string) {
    const user = users.find(user => user.name === name && user.password === password)
    return !!user && { id: user.id, name: user.name }
}