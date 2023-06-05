import { Router } from "express";
import { getUsers } from "./services";

const router = Router()

router.get('/users', getUsers)

export { router as admin }