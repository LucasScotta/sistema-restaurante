import { Handler } from "express";
import { sequelize } from "../../../../db";
import { IProduct } from "../../../../Store";

export const createProduct: Handler = async (req, resp) => {
    const product: IProduct = req.body.product
    const created = await sequelize.createProduct(product)
    if (created instanceof Error) {
        return resp.status(400).json({ status: 'failed', message: 'Product already exists' })
    }
    if (!!created) return resp.status(200).json({ status: 'Success', message: "Product created!" })
    resp.status(400).json({ status: 'failed', message: 'Product couldn\'t be created, please try again' })
}
