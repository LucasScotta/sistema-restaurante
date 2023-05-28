import { Router } from "express";
import { User } from "../model";
import { getUser, setNewUser, users } from "./users";
import { jwt } from "../router/middleware";
import { sign } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config";
import { UserDTO } from "../model/UserDTO";

const router = Router()

router.post('/create', (req, resp) => {
    const { name, password }: UserDTO = req.body
    if (!!name && !!password) {
        const user: User | undefined = users.find(user => user.name === name && user.password === password)
        if (!!user) {
            return resp.status(409).json({ message: 'User already exists' })
        }

        return resp.json(setNewUser(name, password))
    }
    return resp.status(400).json({ message: 'Forbidden credentials' })
})

router.get('/', jwt, (req, resp) => {
    resp.json(users)
})

router.post('/', (req, resp) => {
    const { name, password }: UserDTO = req.body
    if (!!name && !!password) {
        const user = getUser(name, password)
        if (!!user) {
            const token = sign({ name }, JWT_SECRET_KEY, { expiresIn: '2h' })
            return resp.json({ user, token })
        }
        return resp.status(401).json({ message: 'Invalid credentials' })
    }
    return resp.status(400).json({ message: 'Forbidden credentials' })
})

export { router as auth }