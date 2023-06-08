import { Handler } from "express";
import { sign } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../../../config";
import { expirationInSeconds, getExpirationTime } from "../../../../utils";

export const refreshToken: Handler = (req, resp) => {

    const { authorization } = req.headers
    if (!authorization) return resp.status(400).json({ status: 'failed', message: 'Please, login' })

    const { session } = req
    if (!session) return resp.status(400).json({ status: 'failed', message: 'Please, login' })

    const { user } = session
    if (!user) return resp.status(400).json({ status: 'failed', message: 'Please, login' })

    const expiresIn = expirationInSeconds
    const exp = getExpirationTime()
    const token = sign({ user }, JWT_SECRET_KEY, { expiresIn })

    return resp.status(200).json({ user, token, exp })
}
