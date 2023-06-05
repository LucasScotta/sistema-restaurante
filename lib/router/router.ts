import { Router } from "express"
import { auth, admin } from "../routes"
import { isAdmin } from "./middleware"
export const router = Router()

router.use('/auth', auth)
router.use('/admin', isAdmin, admin)
router.get('/', (_req, resp) => resp.send('home'))