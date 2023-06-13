import { ModelDefined } from "sequelize"

export interface ProductAttributes {
    id: number
    name: string
    price: number
}

export type ProductSchemaType = ModelDefined<ProductAttributes, Omit<ProductAttributes, 'id'>>
