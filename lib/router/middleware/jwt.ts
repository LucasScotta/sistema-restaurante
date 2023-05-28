import { NextFunction, Request, Response } from "express";
import { JwtPayload, sign, verify } from 'jsonwebtoken'
import { JWT_SECRET_KEY } from "../../config";
export interface CustomRequest extends Request {
    user?: JwtPayload;
}

export const jwt = (req: CustomRequest, resp: Response, next: NextFunction) => {
    const { name }: { name: string | undefined, password: string | undefined } = req.body
    console.log(name)
    if (!name) return resp.sendStatus(401)
    try {
        verify(name, JWT_SECRET_KEY)
        const user = sign({ name }, JWT_SECRET_KEY, { expiresIn: '2h' })
        console.log(user)
        return next()
    }
    catch (e) {
        return resp.status(400).json({ status: 'failed', message: 'Invalid token or expired' })
    }
}
