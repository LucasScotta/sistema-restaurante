import { config } from 'dotenv'

config()

export const PORT = process.env.PORT || 8080
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'TEST_KEY'
export const DB_NAME = process.env.DB_NAME || 'bussiness'
export const DB_USER_NAME = process.env.DB_USER_NAME || 'admin'
export const DB_PASSWORD = process.env.DB_PASSWORD || 'admin'
