import express, { urlencoded } from 'express'
import { PORT } from './config'
export const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

export const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
