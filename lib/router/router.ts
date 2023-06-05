import { Router } from "express"
import { auth, admin } from "../routes"
export const router = Router()

router.use('/auth', auth)
router.use('/admin', admin)
router.get('/', (_req, resp) => resp.send('home'))