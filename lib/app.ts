import express, { urlencoded } from 'express'
import cors from 'cors'
import { router } from "./router/router";

export const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(router)
