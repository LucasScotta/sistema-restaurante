import { Router } from "express";
import { createProduct, createUser, deleteUser, getAll, getProducts, getUsers, updateUser, deleteProduct } from "./services";

const router = Router()

router.delete('/users/:id', deleteUser)
router.delete('/products/:id', deleteProduct)
router.get('/users', getUsers)
router.put('/users', updateUser)
router.get('/products', getProducts)
router.post('/create/user', createUser)
router.post('/create/product', createProduct)
router.get('/', getAll)

export { router as admin }
