import { Handler } from "express";
import { sequelize } from "../../../../db";
import { IProduct } from "../../../../Store";

export const createProduct: Handler = async (req, resp) => {
    const products: IProduct[] = req.body.products
    const created = await sequelize.createProducts(products)
    if (!!created) return resp.sendStatus(200)
    resp.status(400).send({ status: 'partial', message: 'One or more products couldn\'t be created' })
}
