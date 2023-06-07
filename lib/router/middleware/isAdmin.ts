import { RequestHandler } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../config";
export const isAdmin: RequestHandler = async (req, resp, next) => {

    try {
        const { authorization } = req.headers
        if (!authorization) return resp.status(400).json({
            message: 'Provide your access token'
        })

        const token = authorization.split(' ').pop()
        if (!token) {
            return resp.status(400).json({ status: 'failed', message: 'Invalid token or expired' })
        }
        const { user } = verify(token, JWT_SECRET_KEY) as JwtPayload
        const { rol } = user
        if (!rol || rol !== 'admin') return resp.status(401).json({
            status: 'failed', message: 'You have not admin credentials'
        })
        console.log(user)
        return next()
    }
    catch (e) {
        console.log(e)
        return resp.status(400).json({ status: 'failed', message: 'Invalid token or expired' })
    }
}
