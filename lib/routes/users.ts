import { User } from "../model"

let id = 1
export const users: User[] = [{ id: 0, name: 'dunfu', password: 'as' }]

export function setNewUser(name: string, password: string) {
    const user = { id, name, password }
    users.push(user)
    id += 1
}

export function getUser(name: string, password: string) {
    const user = users.find(user => user.name === name && user.password === password)
    return !!user && { id: user.id, name: user.name }
}