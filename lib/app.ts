import express, { urlencoded } from 'express'
import cors from 'cors'
import { PORT } from './config'
import { router } from "./router/router";

export const app = express()
export const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(router)

