import { Handler } from "express";
import { sequelize } from "../../../../db";

export const getProducts: Handler = async (_req, resp) => {
    const products = await sequelize.getProducts()
    if (products instanceof Error) {
        const { message } = products
        return resp.status(500).send({ status: 'failed', message })
    }
    return resp.json(products)
}
