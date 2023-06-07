import { Router } from "express";
import { deleteUser, getUsers, updateUser } from "./services";

const router = Router()

router.get('/users', getUsers)
router.put('/users', updateUser)
router.delete('/users', deleteUser)

export { router as admin }