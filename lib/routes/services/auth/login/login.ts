import { RequestHandler } from "express";
import { UserActionsDTO } from "../../../../model";
import { sequelize } from "../../../../db";
import { sign } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../../../config";
import { expirationInSeconds, getExpirationTime } from "../../../../utils";

export const login: RequestHandler = async (req, resp) => {

    const { username, password }: UserActionsDTO = req.body
    if (!username || !password) return resp.status(400).json({ message: 'Forbidden credentials' })

    const user = await sequelize.getByPassword({ username, password })
    if (user instanceof Error) {
        return resp.status(403).json({ messasge: user.message })
    }

    const exp = getExpirationTime()
    const expiresIn = expirationInSeconds

    const token = sign({ user }, JWT_SECRET_KEY, { expiresIn })
    return resp.status(200).json({ user, token, exp })
}
