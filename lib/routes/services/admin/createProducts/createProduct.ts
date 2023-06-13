import { Handler } from "express";
import { sequelize } from "../../../../db";
import { IProduct } from "../../../../Store";

export const createProduct: Handler = async (req, resp) => {
    const product: IProduct = req.body.product
    const id = await sequelize.createProduct(product)
    const message = id instanceof Error ? 'Product already exists' : "Product Created!"
    if (id instanceof Error) {
        return resp.status(400).json({ message })
    }
    resp.status(200).json({ message, id })
}
