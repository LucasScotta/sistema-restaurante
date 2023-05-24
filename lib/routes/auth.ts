import { Router } from "express";
import { User } from "../model";

const router = Router()
let id = 1
const users: User[] = [{ id: 0, name: 'dunfu', password: 'as' }]

router.get('/', (req, resp) => {
    resp.json(users)
})

router.post('/', (req, resp) => {
    const { name, password }: { name: string | undefined, password: string | undefined } = req.body
    if (!!name && !!password) {
        const user: User = { id, name, password }
        id += 1
        return resp.send(user)
    }
    return resp.sendStatus(401)
})

export { router as auth }