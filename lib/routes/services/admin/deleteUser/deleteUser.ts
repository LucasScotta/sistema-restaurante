import { RequestHandler } from "express";
import { UserActionsDTO } from "../../../../model";
import { sequelize } from "../../../../db";

export const deleteUser: RequestHandler = async (req, resp) => {
    const { id }: UserActionsDTO = req.params
    try {
        const deleted = await sequelize.deleteUser(id)
        if (!!deleted) return resp.sendStatus(200)
        return resp.sendStatus(201)
    }
    catch (e) {
        return resp.status(500).json({ message: 'Something wrong happened, please try again' })
    }
}
