import express, { urlencoded } from 'express'
import cors from 'cors'
import { router } from './router'
import { server } from './server'
import { WebSocketServer } from './ws'
export const app = express()

app.use(urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(router)

const io = new WebSocketServer(server)
