import { RequestHandler } from "express";

export const isAdmin: RequestHandler = async (req, resp, next) => {

    if (!req.session) return resp.status(400).json({ status: 'failed', message: 'Please, login' })

    const { user } = req.session
    if (!user) return resp.status(400).json({ status: 'failed', message: 'Please, login' })

    const { rol } = user
    if (rol !== 'admin') return resp.status(401).json({ status: 'failed', message: 'You can\'t access here' })

    return next()
}
