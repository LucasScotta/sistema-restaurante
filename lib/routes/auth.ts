import { Router } from "express";
import { login, refreshToken } from "./services";
import { jwtMiddleware } from "../router/middleware";

const router = Router()

router.post('/', login)
router.get('/refresh', jwtMiddleware, refreshToken)

export { router as auth }
