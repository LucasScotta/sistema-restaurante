import { Handler } from "express";
import { sequelize } from "../../../../db";

export const getAll: Handler = async (req, resp) => {
    const users = await sequelize.getAllUsers()
    const products = await sequelize.getProducts()
    if (
        users instanceof Error || products instanceof Error
        || !users || !products) {
        return resp.status(404).json({ status: 'failed', message: 'Data couldn\'t be loaded, please try again' })
    }
    console.log('aca')
    if (!!users && !!products) return resp.status(200).json({ users, products })
}
