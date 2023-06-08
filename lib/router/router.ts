import { Router } from "express"
import { auth, admin } from "../routes"
import { isAdmin, jwtMiddleware } from "./middleware"
export const router = Router()

router.use('/auth', auth)
router.use('/admin', jwtMiddleware, isAdmin, admin)
router.use('/*', (_req, resp) => resp.status(404).send('NOT FOUND'))
