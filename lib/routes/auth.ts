import { Router } from "express";
import { login, createUser, deleteUser } from "./services";

const router = Router()

router.post('/create', createUser)

router.get('/', (req, resp) => {
    resp.json({ users: [] })
})

//Esto es para el login
// const token = sign({ username }, JWT_SECRET_KEY, { expiresIn: '2h' })
router.post('/', login)

router.delete('/', deleteUser)

export { router as auth }