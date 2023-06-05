import { Request, Response } from "express";
import { UserCreationDTO } from "../../../model/UserCreationDTO";
import { sequelize } from "../../../db";

export const login = async (req: Request, resp: Response) => {
    const { username, password, rol }: UserCreationDTO = req.body
    if (!username || !password) return resp.status(400).json({ message: 'Forbidden credentials' })

    const user = await sequelize.getByPassword({ username, password })
    if (user instanceof Error) {
        return resp.status(403).json({ messasge: user.message })
    }
    return resp.status(200).json(user)
}
