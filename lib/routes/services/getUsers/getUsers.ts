import { Handler } from "express";
import { sequelize } from "../../../db";

export const getUsers: Handler = async (req, resp) => {
    const users = await sequelize.getAllUsers()
    if (users instanceof Error) {
        const { message } = users
        return resp.status(500).json({ message })
    }
    return resp.status(200).json(users)
}