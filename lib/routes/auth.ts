import { Router } from "express";
import { User } from "../model";
import { getUser, setNewUser, users } from "./users";

const router = Router()

router.post('/create', (req, resp) => {
    const { name, password }: { name: string | undefined, password: string | undefined } = req.body
    if (!!name && !!password) {
        const user: User | undefined = users.find(user => user.name === name && user.password === password)
        if (!!user) {
            return resp.status(409).json({ message: 'User already exists' })
        }

        return resp.json(setNewUser(name, password))
    }
    return resp.status(400).json({ message: 'Forbidden credentials' })
})

router.get('/', (req, resp) => {
    resp.json(users)
})

router.post('/', (req, resp) => {
    const { name, password }: { name: string | undefined, password: string | undefined } = req.body
    if (!!name && !!password) {
        const user: User | undefined = getUser(name, password)
        if (!!user) {
            return resp.json(user)
        }
        return resp.status(401).json({ message: 'Invalid credentials' })
    }
    return resp.status(400).json({ message: 'Forbidden credentials' })
})

export { router as auth }