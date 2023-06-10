import { Router } from "express";
import { createProduct, createUser, deleteUser, getProducts, getUsers, updateUser } from "./services";

const router = Router()

router.get('/users', getUsers)
router.get('/products', getProducts)
router.post('/users', createUser)
router.put('/users', updateUser)
router.post('/create/product', createProduct)
router.delete('/users', deleteUser)

export { router as admin }
