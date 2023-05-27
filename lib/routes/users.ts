import { User } from "../model"

let id = 1
export const users: User[] = [{ id: 0, name: 'dunfu', password: 'as' }]

export function setNewUser(name: string, password: string) {
    users.push({ id, name, password })
    id += 1
}

export function getUser(name: string, password: string) {
    const user = users.find(user => user.name === name && user.password === password)
    return user
}