import { Router } from "express";
import { login } from "./services";

const router = Router()

//Esto es para el login
// const token = sign({ username }, JWT_SECRET_KEY, { expiresIn: '2h' })
router.post('/', login)


export { router as auth }
