import { RequestHandler } from "express";
import { sequelize } from "../../../../db";
import { UserActionsDTO } from "../../../../model";

export const updateUser: RequestHandler = async (req, resp) => {
    const { id, username, rol }: UserActionsDTO = req.body
    if (!id) return resp.status(400).json({ status: 'failed', message: "User ID is queired for this operation" })

    const updated = await sequelize.updateById(id, { username, rol })
    if (updated instanceof Error) {
        const { message } = updated
        return resp.status(400).json({ status: 'failed', message })
    }
    if (!!updated) {
        const message = "User successfuly updated"
        return resp.status(200).json({ status: 'Success', message })
    }
    return resp.status(500).json({ status: 'Failed', message: 'Something went wrong updating user, please try again' })
}
