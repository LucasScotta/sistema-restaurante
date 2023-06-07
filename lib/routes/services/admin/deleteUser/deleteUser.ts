import { RequestHandler } from "express";
import { UserActionsDTO } from "../../../../model";
import { sequelize } from "../../../../db";

export const deleteUser: RequestHandler = async (req, resp) => {
    const { username, id }: UserActionsDTO = req.body
    const deleted = await sequelize.deleteOne(id, username)

    if (deleted instanceof Error) return resp.status(500).json({ message: 'Something wrong happened, please try again' })

    if (!!deleted) return resp.sendStatus(200)

    return resp.status(400).json({ message: 'Forbidden credentials' })

}
