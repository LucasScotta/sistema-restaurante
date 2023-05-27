import { User } from "../model"

let id = 1
export const users: User[] = [{ id: 0, name: 'dunfu', password: 'as' }]

export function setNewUser(name: string, password: string) {
    users.push({ id, name, password })
    id += 1
}