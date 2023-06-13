import { RequestHandler } from "express";
import { UserActionsDTO } from "../../../../model";
import { sequelize } from "../../../../db";

export const createUser: RequestHandler = async (req, resp) => {
    const { username, password, rol }: UserActionsDTO = req.body
    if (!username || !password) return resp.status(400).json({ message: 'Forbidden credentials' })

    const user = await sequelize.createUser({ username, password, rol })
    if (user instanceof Error) {
        return resp.status(403).json({ message: user.message })
    }
    return resp.status(201).json({ user, message: 'Created!' })
}
