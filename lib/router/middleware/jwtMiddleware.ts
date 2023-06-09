import { Handler, NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from 'jsonwebtoken'
import { JWT_SECRET_KEY } from "../../config";

export const jwtMiddleware: Handler = (req, resp, next) => {
    const { authorization } = req.headers

    if (!authorization) return resp.status(400).json({
        message: 'Please, login'
    })

    const token = authorization.split(' ').pop()
    if (!token) {
        return resp.status(400).json({ status: 'failed', message: 'Please, login' })
    }

    try {
        const { exp, user }: JwtPayload = verify(token, JWT_SECRET_KEY) as JwtPayload
        if (!user || !exp) return resp.status(400).json({ status: 'failed', message: 'Please, login' })
        req.session = { user, exp }
        return next()
    }
    catch (e) {
        return resp.status(401).json({ status: 'failed', message: 'Session expired' })
    }
}
