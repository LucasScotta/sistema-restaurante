import { Router } from "express";
import { createUser, deleteUser, getUsers, updateUser } from "./services";

const router = Router()

router.get('/users', getUsers)
router.post('/users', createUser)
router.put('/users', updateUser)
router.delete('/users', deleteUser)

export { router as admin }
