import { Handler } from "express";
import { sequelize } from "../../../../db";

export const deleteProduct: Handler = async (req, resp) => {
    const { id } = req.params
    try {
        const result = await sequelize.deleteProduct(Number(id))
        if (!!result) return resp.status(200).json({ message: 'Deleted!', status: 'Success' })
        resp.status(400).json({ message: 'Invalid ID', status: 'Failed' })
    }
    catch (e) {
        console.log('deleteProduct error:', e)
        resp.status(500).json({ message: 'Something went wrong deleting product, please try again' })
    }
}
