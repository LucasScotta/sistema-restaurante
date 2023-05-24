import { Router } from "express"
import { auth } from "../routes"
export const router = Router()

router.use('/auth', auth)
router.get('/', (_req, resp) => resp.send('home'))