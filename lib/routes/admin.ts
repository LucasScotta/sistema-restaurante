import { Router } from "express";
import { getUsers } from "./services";

const router = Router()

router.get('/', getUsers)

export { router as admin }