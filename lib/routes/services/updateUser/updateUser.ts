import { Handler } from "express";
import { sequelize } from "../../../db";
import { UserActionsDTO } from "../../../model";

export const updateUser: Handler = async (req, resp) => {
    const { id, username, rol }: UserActionsDTO = req.body
    if (!id) return resp.status(400).json({ status: 'failed', message: "User ID is queired for this operation" })

    const updated = await sequelize.updateById(id, { username, rol })
    if (updated instanceof Error) {
        const { message } = updated
        return resp.status(500).json({ status: 'failed', message })
    }
    const message = "User successfuly updated"
    return resp.send(200).json({ status: 'Success', message })
}
